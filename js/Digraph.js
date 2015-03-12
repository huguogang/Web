/*
 * simple directed graph
 */
function Digraph(V) {
	var adj = []; //adjacency list
	var nV = V; //total number of vertices
	var nE = 0; //total number of edges
	
	var init = function() {
		var i;
		for(i = 0; i < V; i++) {
		    adj[i] = {}; //object should provide faster lookup time
		}
	};
	/*
	 * add an edge from v1 to v2
	 */
	var addEdge = function(v1, v2, w) {
	    var weight = w || 1;
	    adj[v1][v2] = weight;
	    nE++;
	};
	
	var getVCount = function() {
	    return nV;
	};
	
	var getECount = function() {
	   return nE;    
	};
	
	/*
	 * get adjacent vertices of v
	 * 
	 * @return array of vertices that is adjacent to v
	 */
	var getAdj = function(v) {
	    return _.map(adj[v], function(weight, key)) {
	       return  key;
	    });
	}
	/*
	 * get number of edges from v
	 */
	var getDegree = function(v) {
	    return _.size(adj[v]);
	};

	return {
		addEdge: addEdge,
		getVCount: getVCount,
		getECount: getECount,
		getAdj: getAdj,
		getDegree: getDegree,
		
	};
}