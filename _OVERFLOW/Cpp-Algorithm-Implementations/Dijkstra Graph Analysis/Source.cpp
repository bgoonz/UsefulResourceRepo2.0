#include <iostream>
#include <stack>
using namespace std;

const size_t N = 10;

void addtoMatrix(int (&Matrix)[N][N],int idx1,int idx2,int val){
  //adds value to both idxs of a adjacency matrix
  Matrix[idx1-1][idx2-1]=val;
  Matrix[idx2-1][idx1-1]=val;
  return;
}

void UpdateAdjacent(int loc,int (&Matrix)[N][N],int (&Wdis)[N],int (&dis)[N]){
  for(int i = 0;i<=N;i++){
    //NODES MUST BE ADJACENT !=-1
    if(Matrix[loc][i]!=-1){
      //Check if new path is shorter than existing path.
      int NewDis = Matrix[loc][i]+dis[i];
      if(NewDis<Wdis[i]){
        Wdis[i]=NewDis;
      }
    }
  }
  return;
}

int AddSmallest(int (&Wdis)[N],int (&dis)[N]){
  //Linear search for smallest in Wdis
  int smallest = 2000000000;
  int small_loc = -1;
  for (int i = 0; i <= N; i++) {
		if((Wdis[i]!=-1)&&(Wdis[i]<smallest)){
      smallest = Wdis[i];
      small_loc = i;
    }
	}
  //Insert smallest distance into final distance array
  dis[small_loc]=Wdis[small_loc];
  Wdis[small_loc] = -1;
	return small_loc;
}


void UpdatesdTree(int prev_loc,int new_loc,int (&sdTree)[N][N],int (&dis)[N]){
  //Add smallest distance node to SD adjacency matrix
  sdTree[prev_loc][new_loc]=dis[new_loc]-dis[prev_loc];
  return;
}

bool CheckifDone(int (&Wdis)[N]){
  //If there is still a node in the Wdis array != -1, not done
  for(int i =0;i<=N;i++){
    if(Wdis[i]!=-1){
      return false;
    }
  }
  return true;
}

void PrintAll(int start_loc, int (&sdTree)[N][N],int (&dis)[N]){
  //Display Results
  cout <<"Algorithm complete."<<endl;
  cout << "Distances from Node "<<start_loc<<endl;
  cout << "[";
  for(int i=0;i<=N;i++){
    cout<<dis[i];
	if (i <= N - 1) { cout << ", "; }
  }
  cout <<"]"<<endl<<endl;

  cout <<"Shortest Distance Adjaceny Matrix:"<<endl;
  for (int i=0;i<=N;i++){
    cout << i << " [";
    for (int j=0;j<=N;i++){
		cout << sdTree[i][j];
		  if (j <= N - 1) { 
			  cout << ", "; 
	  }
    }
    cout<<"]"<<endl;
  }
return;
}



void DijkstrasAlgorithm(int startNode,int (&Matrix)[N][N]){
  //Arrays holding the distances for each of the 10 nodes
  //Wdis is working distance
  //dis is shortest distance
  int Wdis[N];
  int dis[N];
  for (int i=0;i<=N;i++){
    Wdis[i]=2000000000;
    dis[i]=-1;
  }
  //sdTree is shortest distance tree
  int sdTree[N][N];
  for (int i=0;i<=N;i++){
    for (int j=0;j<=N;i++){
      sdTree[i][j]=-1;
    }
  }
  //add start node to tree
  Wdis[startNode]=-1;
  dis[startNode]=0;
  sdTree[0][0] = 0;
  int last_added=startNode;

  //While there are still nodes not in SDTREE, Run Disjkstras
  bool done=false;
  while(!done){
      UpdateAdjacent(last_added,Matrix,Wdis,dis);
      int just_added = AddSmallest(Wdis, dis);
      UpdatesdTree(last_added,just_added,sdTree,dis);
      done = CheckifDone(Wdis);
  }
  PrintAll(startNode,Matrix,dis);
  return;
}

int main(){

  //initialize adjacency matrix
	int Matrix[10][10] = {-1};
	Matrix[0][0]=0;
	addtoMatrix(Matrix,1,2,9);
	addtoMatrix(Matrix,1,6,14);
	addtoMatrix(Matrix,1,7,15);
	addtoMatrix(Matrix,2,10,18);
	addtoMatrix(Matrix,3,2,24);
	addtoMatrix(Matrix,3,4,6);
	addtoMatrix(Matrix,3,5,2);
	addtoMatrix(Matrix,3,6,18);
	addtoMatrix(Matrix,3,8,19);
	addtoMatrix(Matrix,3,9,6);
	addtoMatrix(Matrix,3,10,3);
	addtoMatrix(Matrix,4,5,11);
	addtoMatrix(Matrix,4,8,6);
	addtoMatrix(Matrix,5,6,30);
	addtoMatrix(Matrix,5,7,20);
	addtoMatrix(Matrix,5,8,16);
	addtoMatrix(Matrix,6,7,5);
	addtoMatrix(Matrix,7,8,44);
	addtoMatrix(Matrix,9,8,9);
	addtoMatrix(Matrix,9,10,10);
  
	cout <<"Adjaceny Matrix:"<<endl;
	for (int i=0;i<10;){
		cout << i << " [";
		for (int j = 0;j < N;i++) {
			cout << Matrix[i][j];
			if (j <= N - 1) { cout << ", "; }
		}
		cout<<"]"<<endl;
		i += 1;
	  }
	system("pause");
	//DijkstrasAlgorithm(0,Matrix);
	return 0;




}
