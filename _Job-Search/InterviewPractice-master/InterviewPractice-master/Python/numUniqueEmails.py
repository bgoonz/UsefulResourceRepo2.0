def numUniqueEmails(emails):
    """
    :type emails: List[str]
    :rtype: int
    """

    diff = {}

    for i in emails:
        email = i.split('@')
        address = email[0].replace('.', '').split('+')
        domain = email[1]
        diff[(address[0] + '@' + domain)] = 1

    return len(diff)


i = ["test.email+alex@leetcode.com", "test.e.mail+bob.cathy@leetcode.com", "testemail+david@lee.tcode.com"]
print(numUniqueEmails(i))