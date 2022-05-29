class Graph {
  constructor(vertices) {
    // Total number of vertices in the graph
    this.vertices = vertices;
    // Defined an array which can hold LL equal to the number of vertices in the graph
    this.list = [];
    // Creating a new LL for each vertex/index of the list
    for (let i = 0; i < vertices.length; i++) {
      let temp = new LinkedList();
      this.list.push(temp);
    }
  }

  addEdge(source, destination) {
    if (source < this.vertices && destination < this.vertices)
      //Since we are implementing a directed list, (0,1) is not the same as (1,0)
      this.list[source].insertAtHead(destination);
    //If we were to implement an undirected graph where (0,1)==(1,0),
    //we would create an additional edge from destination to source too:
    //this.list[destination].insertAtHead(source);
  }
}
