// View the full problem and run the test cases at:
//  https://leetcode.com/problems/course-schedule/

//  >>>num var >>>total of numCourses courses you have to take, labeled from 0 to numCourses-1.
// >>> arr >>> Some courses may have prerequisites expressed as a pair [0,1]
// >>>T/F >>> is it possible for you to finish all courses? 

function graphBuilder(list) {
    let graph = {};
    list.forEach((prereq) => {
        // this step helps us unpack prerequisite to their appropriate components
        let [course, pre] = prereq;
        // ! time to build graph
        // 1st case is if the course is in graph
        if (course in graph) graph[coarse].push(pre);
        // 2nd case add to graph
        else {
            graph[coarse] = [pre];
        }
    });
    return graph;
}



function canFinish(numCourses, prerequisites) {
    // we need to build a graph so we can compare relationships
    graphBuilder(prerequisites);
}

console.log(canFinish(2, [[1,0]]))