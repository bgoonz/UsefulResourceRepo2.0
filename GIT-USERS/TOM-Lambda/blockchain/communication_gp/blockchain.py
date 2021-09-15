import hashlib
import json
from time import time
from uuid import uuid4

from flask import Flask, jsonify, request
from urllib.parse import urlparse
import requests

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

        :param sender: <str> Address of the Recipient
        :param recipient: <str> Address of the Recipient
        :param amount: <int> Amount
        :return: <int> The index of the BLock that will hold this transaction
        """

<<<<<<< HEAD
        self.current_transactions.append({
            'sender': sender,
            'recipient': recipient,
            'amount': amount,
        })

        return self.last_block['index'] + 1
=======
        self.current_transactions.append(
            {"sender": sender, "recipient": recipient, "amount": amount}
        )

        return self.last_block["index"] + 1
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    @staticmethod
    def hash(block):
        """
        Creates a SHA-256 hash of a Block

        :param block": <dict> Block
        "return": <str>
        """

        # We must make sure that the Dictionary is Ordered,
        # or we'll have inconsistent hashes

        block_string = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()

    @property
    def last_block(self):
        return self.chain[-1]

    def proof_of_work(self, last_proof):
        """
        Simple Proof of Work Algorithm
        - Find a number p' such that hash(pp') contains 6 leading
        zeroes, where p is the previous p'
        - p is the previous proof, and p' is the new proof
        """

        proof = 0
        while self.valid_proof(last_proof, proof) is False:
            proof += 1

        return proof

    @staticmethod
    def valid_proof(last_proof, proof):
        """
        Validates the Proof:  Does hash(last_proof, proof) contain 6
        leading zeroes?
        """
<<<<<<< HEAD
        guess = f'{last_proof}{proof}'.encode()
=======
        guess = f"{last_proof}{proof}".encode()
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:6] == "000000"

    def valid_chain(self, chain):
        """
        Determine if a given blockchain is valid

        :param chain: <list> A blockchain
        :return: <bool> True if valid, False if not
        """

        last_block = chain[0]
        current_index = 1

        while current_index < len(chain):
            block = chain[current_index]
<<<<<<< HEAD
            print(f'{last_block}')
            print(f'{block}')
            print("\n-------------------\n")
            # Check that the hash of the block is correct
            if block['previous_hash'] != self.hash(last_block):
                return False

            # Check that the Proof of Work is correct
            if not self.valid_proof(last_block['proof'], block['proof']):
=======
            print(f"{last_block}")
            print(f"{block}")
            print("\n-------------------\n")
            # Check that the hash of the block is correct
            if block["previous_hash"] != self.hash(last_block):
                return False

            # Check that the Proof of Work is correct
            if not self.valid_proof(last_block["proof"], block["proof"]):
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
                return False

            last_block = block
            current_index += 1

        return True

    def register_node(self, address):
        """
        Add a new node to the list of nodes
        :param address: <str> Address of node. Eg. 'http://192.168.0.5:5000'
        :return: None
        """

        parsed_url = urlparse(address)
        self.nodes.add(parsed_url.netloc)

    def resolve_conflicts(self):
        """
        This is our Consensus Algorithm, it resolves conflicts
        by replacing our chain with the longest one in the network.
        :return: <bool> True if our chain was replaced, False if not
        """

        neighbours = self.nodes
        new_chain = None

        # We're only looking for chains longer than ours
        max_length = len(self.chain)

        # Grab and verify the chains from all the nodes in our network
        for node in neighbours:
<<<<<<< HEAD
            response = requests.get(f'http://{node}/chain')

            if response.status_code == 200:
                length = response.json()['length']
                chain = response.json()['chain']
=======
            response = requests.get(f"http://{node}/chain")

            if response.status_code == 200:
                length = response.json()["length"]
                chain = response.json()["chain"]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

                # Check if the length is longer and the chain is valid
                if length > max_length and self.valid_chain(chain):
                    max_length = length
                    new_chain = chain

        # Replace our chain if we discovered a new, valid chain longer than
        # ours
        if new_chain:
            self.chain = new_chain
            return True

        return False


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
def mine():
    # Determine if proof is valid
    last_block = blockchain.last_block
    last_proof = last_block['proof']

    values = request.get_json()
    submitted_proof = values.get('proof')
=======
@app.route("/mine", methods=["POST"])
def mine():
    # Determine if proof is valid
    last_block = blockchain.last_block
    last_proof = last_block["proof"]

    values = request.get_json()
    submitted_proof = values.get("proof")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    if blockchain.valid_proof(last_proof, submitted_proof):
        # We must receive a reward for finding the proof.
        # The sender is "0" to signify that this node has mine a new coin
<<<<<<< HEAD
        blockchain.new_transaction(
            sender="0",
            recipient=node_identifier,
            amount=1,
        )
=======
        blockchain.new_transaction(sender="0", recipient=node_identifier, amount=1)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

        # Forge the new BLock by adding it to the chain
        previous_hash = blockchain.hash(last_block)
        block = blockchain.new_block(submitted_proof, previous_hash)

        response = {
<<<<<<< HEAD
            'message': "New Block Forged",
            'index': block['index'],
            'transactions': block['transactions'],
            'proof': block['proof'],
            'previous_hash': block['previous_hash'],
        }
        return jsonify(response), 200
    else:
        response = {
            'message': "Proof was invalid or already submitted."
        }
        return jsonify(response), 200


@app.route('/transactions/new', methods=['POST'])
=======
            "message": "New Block Forged",
            "index": block["index"],
            "transactions": block["transactions"],
            "proof": block["proof"],
            "previous_hash": block["previous_hash"],
        }
        return jsonify(response), 200
    else:
        response = {"message": "Proof was invalid or already submitted."}
        return jsonify(response), 200


@app.route("/transactions/new", methods=["POST"])
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def new_transaction():
    values = request.get_json()

    # Check that the required fields are in the POST'ed data
<<<<<<< HEAD
    required = ['sender', 'recipient', 'amount']
    if not all(k in values for k in required):
        return 'Missing Values', 400

    # Create a new Transaction
    index = blockchain.new_transaction(values['sender'],
                                       values['recipient'],
                                       values['amount'])

    response = {'message': f'Transaction will be added to Block {index}'}
    return jsonify(response), 201


@app.route('/chain', methods=['GET'])
def full_chain():
    response = {
        'chain': blockchain.chain,
        'length': len(blockchain.chain),
    }
    return jsonify(response), 200


@app.route('/last_proof', methods=['GET'])
def last_proof():
    last_proof_value = blockchain.last_block.get('proof')
    response = {
        'proof': last_proof_value
    }
=======
    required = ["sender", "recipient", "amount"]
    if not all(k in values for k in required):
        return "Missing Values", 400

    # Create a new Transaction
    index = blockchain.new_transaction(
        values["sender"], values["recipient"], values["amount"]
    )

    response = {"message": f"Transaction will be added to Block {index}"}
    return jsonify(response), 201


@app.route("/chain", methods=["GET"])
def full_chain():
    response = {"chain": blockchain.chain, "length": len(blockchain.chain)}
    return jsonify(response), 200


@app.route("/last_proof", methods=["GET"])
def last_proof():
    last_proof_value = blockchain.last_block.get("proof")
    response = {"proof": last_proof_value}
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    return jsonify(response), 200


# Post body as JSON to add node
# {
# 	"nodes": ["http://localhost:5001"]
# }
<<<<<<< HEAD
@app.route('/nodes/register', methods=['POST'])
def register_nodes():

    values = request.get_json()
    nodes = values.get('nodes')
=======
@app.route("/nodes/register", methods=["POST"])
def register_nodes():

    values = request.get_json()
    nodes = values.get("nodes")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    if nodes is None:
        return "Error: Please supply a valid list of nodes", 400

    for node in nodes:
        blockchain.register_node(node)

    response = {
<<<<<<< HEAD
        'message': 'New nodes have been added',
        'total_nodes': list(blockchain.nodes),
=======
        "message": "New nodes have been added",
        "total_nodes": list(blockchain.nodes),
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    }
    return jsonify(response), 201


<<<<<<< HEAD
@app.route('/nodes/resolve', methods=['GET'])
=======
@app.route("/nodes/resolve", methods=["GET"])
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def consensus():
    replaced = blockchain.resolve_conflicts()

    if replaced:
<<<<<<< HEAD
        response = {
            'message': 'Our chain was replaced',
            'new_chain': blockchain.chain
        }
    else:
        response = {
            'message': 'Our chain is authoritative',
            'chain': blockchain.chain
        }
=======
        response = {"message": "Our chain was replaced", "new_chain": blockchain.chain}
    else:
        response = {"message": "Our chain is authoritative", "chain": blockchain.chain}
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    return jsonify(response), 200


# Note, when demoing, start with this, then change to the below
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)

<<<<<<< HEAD
if __name__ == '__main__':
=======
if __name__ == "__main__":
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    else:
        port = 5000
<<<<<<< HEAD
    app.run(host='0.0.0.0', port=port)
=======
    app.run(host="0.0.0.0", port=port)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
