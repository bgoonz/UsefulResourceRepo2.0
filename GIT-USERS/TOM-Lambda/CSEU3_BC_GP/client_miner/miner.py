import hashlib
import requests

import sys
import json


def proof_of_work(block):
    """
    Simple Proof of Work Algorithm
    Stringify the block and look for a proof.
    Loop through possibilities, checking each one against `valid_proof`
    in an effort to find a number that is a valid proof
    :return: A valid proof for the provided block
    """
    block_string = json.dumps(block, sort_keys=True)
    proof = 0
    # loop while the return from a call to valid proof is False
    while valid_proof(block_string, proof) is False:
<<<<<<< HEAD
        proof += 1        
=======
        proof += 1
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # return proof
    return proof


def valid_proof(block_string, proof):
    """
    Validates the Proof:  Does hash(block_string, proof) contain 6
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
if __name__ == '__main__':
=======
if __name__ == "__main__":
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # What is the server address? IE `python3 miner.py https://server.com/api/`
    if len(sys.argv) > 1:
        node = sys.argv[1]
    else:
        node = "http://localhost:5000"

    coins_mined = 0

    # Load ID
    f = open("my_id.txt", "r")
    id = f.read()
    print("ID is", id)
    f.close()

    # Run forever until interrupted
    while True:
        r = requests.get(url=node + "/last_block")
        # Handle non-json response
        try:
            data = r.json()
        except ValueError:
            print("Error:  Non-json response")
            print("Response returned:")
            print(r)
            break

        # Get the block from `data` and use it to look for a new proof
<<<<<<< HEAD
        new_proof = proof_of_work(data.get('last_block'))
=======
        new_proof = proof_of_work(data.get("last_block"))
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

        # When found, POST it to the server {"proof": new_proof, "id": id}
        post_data = {"proof": new_proof, "id": id}

        r = requests.post(url=node + "/mine", json=post_data)
        data = r.json()

        # If the server responds with a 'message' 'New Block Forged'
<<<<<<< HEAD
        if data.get('message') == 'New Block Forged':
=======
        if data.get("message") == "New Block Forged":
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            # add 1 to the number of coins mined and print it.  Otherwise,
            coins_mined += 1
            print(f"Total Coins Mined: {coins_mined}")
        # otherwise
        else:
            # print the message from the server.
<<<<<<< HEAD
            print(data.get('message'))
=======
            print(data.get("message"))
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
