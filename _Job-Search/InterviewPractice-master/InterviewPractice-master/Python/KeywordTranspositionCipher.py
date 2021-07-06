'''
Title     : Keyword Transposition Cipher
Subdomain : Cryptography
Domain    : Security
Author    : Kalpak Seal
Created   : 26 September 2016
'''
import collections

alpha_l = []
for i in range(0, 26):
    alpha_l.append(str(chr(65 + i)))
# print (alpha_l)

n = int(raw_input())  # No. of Testcases
for i in range(n):
    keyword = raw_input()  # keyword text

    # keyword = "SECRET"
    # print (keyword)

    cipher = raw_input()  # Cipher to be decrypted
    # print (cipher)

    keyword_mod = []
    # Store non-repeating characters of the keyword in keyword_mod
    for j in keyword:
        if j not in keyword_mod:
            keyword_mod.append(j)
    #print (keyword_mod)

    keyword_mod_len = len(keyword_mod)

    substitution_od = collections.OrderedDict()
    # Creating an orderedDict with elements in keyword_mod as the key of the dictionary.
    for j in keyword_mod:
        substitution_od[j] = []

    cnt = 0
    pos = 0

    # column_ar is an array comprising of keyword_mod + alphabets from the alpha_l list
    column_ar = keyword_mod
    for j in alpha_l:
        if j not in keyword_mod:
            column_ar.append(j)
    #print (column_ar)

    for j in range(0, keyword_mod_len):
        cnt = j

        key = keyword_mod[pos]

        while cnt < 26:
            character = column_ar[cnt]

            if key != character:
                substitution_od[key].append(character)  # Adding characters under the same column to the key in the dict.

            cnt += keyword_mod_len  # looping increment is the length of keyword_mod list
        pos += 1

    substitution_od = sorted(substitution_od.items())   # Sort the dictionary on the basis of the key as asked

    #print (substitution_od)

    # Converting the ordered dictionary to list
    substitution_l = []

    for key_val in substitution_od:
        substitution_l.append(key_val[0])
        for j in key_val[1]:
            substitution_l.append(j)

    #print (substitution_l)

    # Mapping the keyword list with English alphabets
    decryption_dict = dict(zip(substitution_l, alpha_l))
    #print (decryption_dict)

    # Decrypting the cipher text with the help of the decryption dict
    decrypt_msg = ''
    for c in cipher:
        if c in decryption_dict.keys():
            decrypt_msg += decryption_dict[c]
        else:
            decrypt_msg += c   # generally adds the spaces to the original messages

    print(decrypt_msg)
