from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from pymongo.errors import DuplicateKeyError
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from bson import ObjectId

# Initialize Flask app
app = Flask(__name__)

# MongoDB Configuration
app.config[
    "MONGO_URI"] = "mongodb://localhost:27017/package_tracking"
mongo = PyMongo(app)

# Ensure the email field has a unique index
with app.app_context():
    mongo.db.users.create_index("email", unique=True)


# User Registration Endpoint
@app.route('/auth/register', methods=['POST'])
def register():
    data = request.json
    users = mongo.db.users  # Access the 'users' collection

    try:
        # Hash the password
        hashed_password = generate_password_hash(data["password"])

        # Insert new user into the database
        user_data = {
            "name": data["name"],
            "email": data["email"],
            "phone": data["phone"],
            "password_hash": hashed_password
        }
        users.insert_one(user_data)

        return jsonify({"message": "User registered successfully"}), 201

    except DuplicateKeyError:
        return jsonify({"message": "This email is already registered. Please use a different email."}), 400


# User Login Endpoint
@app.route('/auth/login', methods=['POST'])
def login():
    data = request.json
    users = mongo.db.users  # Access the 'users' collection

    # Find user by email
    user = users.find_one({"email": data["email"]})
    if not user or not check_password_hash(user["password_hash"], data["password"]):
        return jsonify({"message": "Invalid email or password"}), 401

    return jsonify({"message": "Login successful", "user": user["name"]}), 200


        ###################Order Creation Endpoint#################

@app.route('/orders', methods=['POST'])
def create_order():
    data = request.json
    orders = mongo.db.orders  # Access the 'orders' collection

    # Validate required fields
    required_fields = ['pickup_location', 'dropoff_location', 'package_details', 'delivery_time', 'user_email']
    for field in required_fields:
        if field not in data:
            return jsonify({"message": f"Missing {field}"}), 400

    # Validate delivery_time format
    try:
        delivery_time = datetime.strptime(data["delivery_time"], "%Y-%m-%d %H:%M:%S")
    except ValueError:
        return jsonify({"message": "Invalid delivery time format. Use YYYY-MM-DD HH:MM:SS"}), 400

    # Find user to validate email (optional, to ensure the user exists)
    users = mongo.db.users
    user = users.find_one({"email": data["user_email"]})
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Store the order in the database
    order_data = {
        "pickup_location": data["pickup_location"],
        "dropoff_location": data["dropoff_location"],
        "package_details": data["package_details"],
        "delivery_time": delivery_time,
        "user_email": data["user_email"],
        "status": "pending",  # You can set an initial status for the order
        "created_at": datetime.utcnow(),  # Record the creation time
    }

    orders.insert_one(order_data)

    return jsonify({"message": "Order created successfully", "order_id": str(order_data['_id'])}), 201


# My Orders Endpoint
@app.route('/orders/my_orders', methods=['GET'])
def get_my_orders():
    try:
        user_email = request.args.get('user_email')  # Get user email from query params or session

        if not user_email:
            return jsonify({"message": "User email is required to fetch orders."}), 400

        # Access the 'orders' collection
        orders = mongo.db.orders

        # Fetch orders for the logged-in user
        user_orders = list(orders.find({"user_email": user_email}))

        # Check if no orders found
        if len(user_orders) == 0:
            return jsonify({"message": "No orders found for this user."}), 404

        # Prepare response data
        orders_list = []
        for order in user_orders:
            order_data = {
                "order_id": str(order['_id']),
                "pickup_location": order.get('pickup_location'),
                "dropoff_location": order.get('dropoff_location'),
                "package_details": order.get('package_details'),
                "delivery_time": order.get('delivery_time'),
                "status": order.get('status'),
                "created_at": order.get('created_at')
            }
            orders_list.append(order_data)

        return jsonify({"orders": orders_list}), 200

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


# Endpoint to retrieve order details
@app.route('/orders/<order_id>', methods=['GET'])
def get_order_details(order_id):
    try:
        # Access the 'orders' collection
        orders = mongo.db.orders

        # Fetch order by its ID
        order = orders.find_one({"_id": ObjectId(order_id)})

        if not order:
            return jsonify({"message": "Order not found."}), 404

        # Prepare order details response data
        order_data = {
            "order_id": str(order['_id']),
            "pickup_location": order.get('pickup_location'),
            "dropoff_location": order.get('dropoff_location'),
            "package_details": order.get('package_details'),
            "delivery_time": order.get('delivery_time'),
            "status": order.get('status'),
            "courier_info": order.get('courier_info', 'Not Assigned'),  # Optional field
            "created_at": order.get('created_at')
        }

        return jsonify({"order_details": order_data}), 200

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


# Endpoint to cancel the order (only if it's still pending)
@app.route('/orders/cancel/<order_id>', methods=['PATCH'])
def cancel_order(order_id):
    try:
        # Access the 'orders' collection
        orders = mongo.db.orders

        # Fetch order by its ID
        order = orders.find_one({"_id": ObjectId(order_id)})

        if not order:
            return jsonify({"message": "Order not found."}), 404

        # Check if the order status is "pending" and allow cancellation
        if order.get('status') != 'pending':
            return jsonify({"message": "Order cannot be cancelled because it's not pending."}), 400

        # Update the status to 'cancelled'
        orders.update_one({"_id": ObjectId(order_id)}, {"$set": {"status": "cancelled"}})

        return jsonify({"message": "Order successfully cancelled."}), 200

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


@app.route('/courier/orders', methods=['GET'])
def get_assigned_orders():
    try:
        # Get the courier ID from query parameters
        courier_id = request.args.get('courier_id')

        if not courier_id:
            return jsonify({"message": "Courier ID is required."}), 400

        # Access the 'orders' collection
        orders = mongo.db.orders

        # Fetch orders assigned to this courier
        assigned_orders = list(orders.find({"courier_id": courier_id}))

        if len(assigned_orders) == 0:
            return jsonify({"message": "No orders assigned to this courier."}), 404

        # Prepare response data
        orders_list = []
        for order in assigned_orders:
            order_data = {
                "order_id": str(order['_id']),
                "pickup_location": order.get('pickup_location'),
                "dropoff_location": order.get('dropoff_location'),
                "package_details": order.get('package_details'),
                "delivery_time": order.get('delivery_time'),
                "status": order.get('status'),
                "created_at": order.get('created_at')
            }
            orders_list.append(order_data)

        return jsonify({"assigned_orders": orders_list}), 200

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


@app.route('/courier/orders/update_status', methods=['PATCH'])
def update_order_status():
    try:
        # Parse the JSON payload
        data = request.json
        order_id = data.get('order_id')
        courier_id = data.get('courier_id')
        new_status = data.get('status')

        if not all([order_id, courier_id, new_status]):
            return jsonify({"message": "Order ID, Courier ID, and new status are required."}), 400

        # Access the 'orders' collection
        orders = mongo.db.orders

        # Find the order and validate it belongs to the courier
        order = orders.find_one({"_id": ObjectId(order_id), "courier_id": courier_id})

        if not order:
            return jsonify({"message": "Order not found or not assigned to this courier."}), 404

        # Update the order's status
        orders.update_one(
            {"_id": ObjectId(order_id)},
            {"$set": {"status": new_status}}
        )

        return jsonify({"message": "Order status updated successfully."}), 200

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


# Run the application
if __name__ == '__main__':
    app.run(debug=True)
