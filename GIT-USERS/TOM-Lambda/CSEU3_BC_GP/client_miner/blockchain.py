import hashlib
import json
from time import time
from uuid import uuid4

from flask import Flask, jsonify, request


class Blockchain(object):
    def __init__(self):
        self.chain = []
        self.current_transactions = []

        # Create the genesis block
        self.new_block(previous_hash=1, proof=100)

    def new_block(self, proof, previous_hash=None):
        """
        Create a new Block in the Blockchain
        A block should have:
        * Index
        * Timestamp
        * List of current transactions
        * The proof used to mine this block
        * The hash of the previous block
        :param proof: <int> The proof given by the Proof of Work algorithm
        :param previous_hash: (Optional) <str> Hash of previous Block
        :return: <dict> New Block
        """

        block = {
            "index": len(self.chain) + 1,
            "timestamp": time(),
            "transactions": self.current_transactions,
            "proof": proof,
<<<<<<< HEAD
            "previous_hash": previous_hash or self.hash(self.chain[-1])
=======
            "previous_hash": previous_hash or self.hash(self.chain[-1]),
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        }

        # Reset the current list of transactions
        self.current_transactions = []
        # Append the block to the chain
        self.chain.append(block)
        # Return the new block
        return block

    def hash(self, block):
        """
        Creates a SHA-256 hash of a Block
        :param block": <dict> Block
        "return": <str>
        """

        # Use json.dumps to convert json into a string
        # It requires a `bytes-like` object, which is what
        # .encode() does.
        # It converts the Python string into a byte string.
        # We must make sure that the Dictionary is Ordered,
        # or we'll have inconsistent hashes
        block_string = json.dumps(block, sort_keys=True).encode()
        # Use hashlib.sha256 to create a hash
        # By itself, the sha256 function returns the hash in a raw string
        # that will likely include escaped characters.
        # This can be hard to read, but .hexdigest() converts the
        # hash to a string of hexadecimal characters, which is
        # easier to work with and understand
<<<<<<< HEAD
        

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

        # Return the hashed block string in hexadecimal format
        return hashlib.sha256(block_string).hexdigest()

<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    @property
    def last_block(self):
        return self.chain[-1]

    @staticmethod
    def valid_proof(block_string, proof):
        """
        Validates the Proof:  Does hash(block_string, proof) contain 3
        leading zeroes?  Return true if the proof is valid
        :param block_string: <string> The stringified block to use to
        check in combination with `proof`
        :param proof: <int?> The value that when combined with the
        stringified previous block results in a hash that has the
        correct number of leading zeroes.
        :return: True if the resulting hash is a valid proof, False otherwise
        """
        # set a initial guess concatonate block string and proof then encode them
        guess = f"{block_string}{proof}".encode()
        # create a guess hash and hexdigest it
        guess_hash = hashlib.sha256(guess).hexdigest()
        # then return True if the guess hash has the valid number of leading zeros otherwise return False
        return guess_hash[:6] == "000000"


<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# Instantiate our Node
app = Flask(__name__)

# Generate a globally unique address for this node
<<<<<<< HEAD
node_identifier = str(uuid4()).replace('-', '')
=======
node_identifier = str(uuid4()).replace("-", "")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# Instantiate the Blockchain
blockchain = Blockchain()


<<<<<<< HEAD
@app.route('/mine', methods=['POST'])
=======
@app.route("/mine", methods=["POST"])
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def mine():

    # handle non json response
    data = request.get_json()

    # require the proof and id to be present
<<<<<<< HEAD
    required = ['proof', 'id']
=======
    required = ["proof", "id"]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    # if the values from data are not in required
    if not all(k in data for k in required):
        # then send a json message of missing values
<<<<<<< HEAD
        response = {'message': "Missing Values"}
        # return a 400 error
        return jsonify(response), 400
    
    # get the submitted proof from data
    submitted_proof = data.get('proof')
=======
        response = {"message": "Missing Values"}
        # return a 400 error
        return jsonify(response), 400

    # get the submitted proof from data
    submitted_proof = data.get("proof")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    # determine if proof is valid
    last_block = blockchain.last_block
    last_block_string = json.dumps(last_block, sort_keys=True)
    if blockchain.valid_proof(last_block_string, submitted_proof):
        # forge the new block
        previous_hash = blockchain.hash(last_block)
        block = blockchain.new_block(submitted_proof, previous_hash)
        # build a response dictionary

        response = {
<<<<<<< HEAD
            'message': "New Block Forged",
            'index': block['index'],
            'transactions': block['transactions'],
            'proof': block['proof'],
            'previous_hash': block['previous_hash']
=======
            "message": "New Block Forged",
            "index": block["index"],
            "transactions": block["transactions"],
            "proof": block["proof"],
            "previous_hash": block["previous_hash"],
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        }
        # return the response
        return jsonify(response), 200
    # otherwise
    else:
        # send a json mesage that the proof was invalid
<<<<<<< HEAD
        response = { 'message': "Proof was invalid or already submitted"}
=======
        response = {"message": "Proof was invalid or already submitted"}
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

        return jsonify(response), 200


<<<<<<< HEAD
@app.route('/chain', methods=['GET'])
def full_chain():
    response = {
        "length": len(blockchain.chain),
        "chain": blockchain.chain
    }
    return jsonify(response), 200

@app.route('/last_block', methods=['GET'])
def last_block():
    response = { 'last_block': blockchain.last_block }
=======
@app.route("/chain", methods=["GET"])
def full_chain():
    response = {"length": len(blockchain.chain), "chain": blockchain.chain}
    return jsonify(response), 200


@app.route("/last_block", methods=["GET"])
def last_block():
    response = {"last_block": blockchain.last_block}
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    return jsonify(response), 200


# Run the program on port 5000
<<<<<<< HEAD
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
=======
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
