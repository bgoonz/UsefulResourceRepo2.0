
def bellman_ford(graph, source):
    weight = {}
    pre_node = {}

    initialize_single_source(graph, source, weight, pre_node)

    for i in range(1, len(graph)):
        for node in graph:
            for adjacent in graph[node]:
                if weight[adjacent] > weight[node] + graph[node][adjacent]:
                    weight[adjacent] = weight[node] + graph[node][adjacent]
                    pre_node[adjacent] = node

    for node in graph:
        for adjacent in graph[node]:
            if weight[adjacent] > weight[node] + graph[node][adjacent]:
                return False

    return True

def initialize_single_source(graph, source, weight, pre_node):

    for node in graph:
        weight[node] = float('inf')
        pre_node[node] = None

    weight[source] = 0
    
