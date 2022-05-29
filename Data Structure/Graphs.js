class Graph {
    constructor(vertices) {
        // Total number of vertices in the graph
        this.vertices = vertices;
        // Defined an array which can hold LL equal to the number of vertices in the graph
        this.list = [];
        // Creating a new LL for each vertex/index of the list
        for (i = 0; i < vertices.length; i++) {
            let temp = new LinkedList();
            this.list.push(temp);
        }
    }
}