import hashlib
import json
from time import time
from uuid import uuid4

from flask import Flask, jsonify, request

import sys


class Blockchain(object):
    def __init__(self):
        self.chain = []
        self.current_transactions = []
        self.nodes = set()

        self.new_block(previous_hash=1, proof=100)

    def new_block(self, proof, previous_hash=None):
        """
        Create a new Block in the Blockchain
        :param proof: <int> The proof given by the Proof of Work algorithm
        :param previous_hash: (Optional) <str> Hash of previous Block
        :return: <dict> New Block
        """

        block = {
<<<<<<< HEAD
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'transactions': self.current_transactions,
            'proof': proof,
            'previous_hash': previous_hash or self.hash(self.chain[-1]),
=======
            "index": len(self.chain) + 1,
            "timestamp": time(),
            "transactions": self.current_transactions,
            "proof": proof,
            "previous_hash": previous_hash or self.hash(self.chain[-1]),
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        }

        # Reset the current list of transactions
        self.current_transactions = []

        self.chain.append(block)
        return block

    def new_transaction(self, sender, recipient, amount):
        """
        Creates a new transaction to go into the next mined Block

        :param sender: <str> Address of the Sender
        :param recipient: <str> Address of the Recipient
        :param amount: <int> Amount
        :return: <int> The index of the BLock that will hold this transaction
        """
        # append the sender, recipient and amount to the current transactions
<<<<<<< HEAD
        self.current_transactions.append({ 'sender': sender, 'recipient': recipient, 'amount': amount })
        # return the last blocks index + 1
        return self.last_block['index'] + 1
    
=======
        self.current_transactions.append(
            {"sender": sender, "recipient": recipient, "amount": amount}
        )
        # return the last blocks index + 1
        return self.last_block["index"] + 1

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    @staticmethod
    def hash(block):
        """
        Creates a SHA-256 hash of a Block
        :param block": <dict> Block
        "return": <str>
        """

<<<<<<< HEAD
        # Two line version:  
=======
        # Two line version:
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # block_string = json.dumps(block, sort_keys=True).encode()
        # return hashlib.sha256(block_string).hexdigest()

        # Use json.dumps to convert json into a string
        # Use hashlib.sha256 to create a hash
        # It requires a `bytes-like` object, which is what
        # .encode() does.
        # It convertes the string to bytes.
        # We must make sure that the Dictionary is Ordered,
        # or we'll have inconsistent hashes

        string_object = json.dumps(block, sort_keys=True)
        block_string = string_object.encode()

        raw_hash = hashlib.sha256(block_string)
        hex_hash = raw_hash.hexdigest()

        # By itself, the sha256 function returns the hash in a raw string
        # that will likely include escaped characters.
        # This can be hard to read, but .hexdigest() converts the
        # hash to a string of hexadecimal characters, which is
        # easier to work with and understand

        return hex_hash

    @property
    def last_block(self):
        return self.chain[-1]

<<<<<<< HEAD
    

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
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
<<<<<<< HEAD
        guess = f'{block_string}{proof}'.encode()
=======
        guess = f"{block_string}{proof}".encode()
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:6] == "000000"


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
    # handle non json responses
    values = request.get_json()
    # check that the required fields are in the posted data
<<<<<<< HEAD
    required_fields = ['proof', 'id']
    if not all(k in values for k in required_fields):
        response = {'message': "Missing Values"}
        return jsonify(response), 400

    # get the submitted proof from the values data
    submitted_proof = values.get('proof')
=======
    required_fields = ["proof", "id"]
    if not all(k in values for k in required_fields):
        response = {"message": "Missing Values"}
        return jsonify(response), 400

    # get the submitted proof from the values data
    submitted_proof = values.get("proof")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # determine if the proof is valid
    last_block = blockchain.last_block
    last_block_string = json.dumps(last_block, sort_keys=True).encode()

    if blockchain.valid_proof(last_block_string, submitted_proof):
        # Forge the new Block by adding it to the chain
        previous_hash = blockchain.hash(last_block)
        block = blockchain.new_block(submitted_proof, previous_hash)

        # reward the miner for work
        blockchain.new_transaction(sender="0", recipient=node_identifier, amount=1)

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
        return jsonify(response), 200
    # otherwise
    else:
        # send a message stating that proof was invalid or already submitted
<<<<<<< HEAD
        response = {'message': 'Proof was invalid or already submitted'}
=======
        response = {"message": "Proof was invalid or already submitted"}
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

        return jsonify(response), 200


<<<<<<< HEAD
@app.route('/chain', methods=['GET'])
def full_chain():
    response = {
        'length': len(blockchain.chain),
        'chain': blockchain.chain,
    }
    return jsonify(response), 200

@app.route('/last_block', methods=['GET'])
def last_block():
    response = { 'last_block': blockchain.last_block }
    return jsonify(response), 200

@app.route('/transactions/new', methods=['POST'])
=======
@app.route("/chain", methods=["GET"])
def full_chain():
    response = {"length": len(blockchain.chain), "chain": blockchain.chain}
    return jsonify(response), 200


@app.route("/last_block", methods=["GET"])
def last_block():
    response = {"last_block": blockchain.last_block}
    return jsonify(response), 200


@app.route("/transactions/new", methods=["POST"])
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def new_transaction():
    # get the values in json format
    values = request.get_json()
    # check that the required fields exist
<<<<<<< HEAD
    required_fields = ['sender', 'recipient', 'amount']

    if not all(k in values for k in required_fields):
        response = { 'message': 'Error Missing values' }
        return jsonify(response), 400

    # create a new transaction
    index = blockchain.new_transaction(values['sender'], values['recipient'], values['amount'])

    # set the response object with a message that the transaction will be added at the index
    response = { 'message': f'Transaction will be added to Block {index}'}
    # return the response
    return jsonify(response), 201

# Run the program on port 5000
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

=======
    required_fields = ["sender", "recipient", "amount"]

    if not all(k in values for k in required_fields):
        response = {"message": "Error Missing values"}
        return jsonify(response), 400

    # create a new transaction
    index = blockchain.new_transaction(
        values["sender"], values["recipient"], values["amount"]
    )

    # set the response object with a message that the transaction will be added at the index
    response = {"message": f"Transaction will be added to Block {index}"}
    # return the response
    return jsonify(response), 201


# Run the program on port 5000
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
