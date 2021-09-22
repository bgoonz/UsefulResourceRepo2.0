#include <array>
#include<iostream>
using namespace std;

struct node{
	int val;
	struct node *left, *right;
};

struct node *newNode(int n){
	struct node *temp = new node;
	temp->val = n;
	temp->left = temp->right = NULL;
	return temp;
}

struct node* InsertNode(struct node* node, int n){
	if (node == NULL) return newNode(n);

	if (n < node->val)
		node->left = InsertNode(node->left, n);
	else if (n > node->val)
		node->right = InsertNode(node->right, n);

	return node;
}

void Traverse(struct node *root){
	if (root != NULL)
	{
		Traverse(root->left);
		cout << "   " << root->val << endl;
		Traverse(root->right);
	}
	return;
}

struct node* FindPred(struct node*root) {
	struct node* current = root;
	while (current->right != NULL)
		current = current->right;
	return current;
}


struct node* DeleteNode(struct node*root, int n) {
	if (root == NULL) return root;

	if (n < root->val) {
		root->left = DeleteNode(root->left, n);
	} 
	else if (n > root->val) {
		root->right = DeleteNode(root->right, n);
	}
	else {
		if (root->left == NULL) {
			struct node *temp = root->right;
			free(root);
			return temp;
		}
		else if (root->right == NULL) {
			struct node *temp = root->left;
			free(root);
			return temp;
		}
		else {
			struct node* temp = FindPred(root->left);
			root->val = temp->val;
			root->right = DeleteNode(root->left, temp->val);
		}
	}
	return root;
}

int main()
{
	
	struct node *root = NULL;
	root = InsertNode(root, 50);
	InsertNode(root, 12);
	InsertNode(root, 67);
	InsertNode(root, 28);
	InsertNode(root, 42);
	InsertNode(root, 55);
	InsertNode(root, 21);
	InsertNode(root, 88);
	InsertNode(root, 95);
	InsertNode(root, 79);
	InsertNode(root, 71);
	InsertNode(root, 81);
	InsertNode(root, 64);
	InsertNode(root, 69);
	InsertNode(root, 100);
	Traverse(root);

	cout << endl << "Deleting 100 " << endl;
	DeleteNode(root, 100);
	Traverse(root);

	cout << endl << "Deleting 55 " << endl;
	DeleteNode(root, 55);
	Traverse(root);


	system("pause");
	return 0;
}