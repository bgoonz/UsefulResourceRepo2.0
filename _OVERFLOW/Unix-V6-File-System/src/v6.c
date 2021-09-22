/***********************************************************************

 This program allows user to do two things:
   1. initfs: Initilizes the file system and redesigning the Unix file system to accept large
      files of up to 4GB, expands the free array to 152 elements, expands the i-node array to
      200 elemnts, doubles the i-node size to 64 bytes and other new features as well.
  2. cpin - copy a file into the filesystem
  3. cpout - copy a file out of the filesystem
  4. ls - list contents of directory
  5. cat - list contents of a file
  6. rm - remove a file/directory
  7. Quit: save all work and exit the program.

 User Input:
     - initfs (file path) (# of total system blocks) (# of System i-nodes)
     - cpin srcfile dstpath
     - cpout srcpath dstpath
     - ls [dirpath]
     - cat filepath
     - q

 File name is limited to 14 characters.


 ***********************************************************************/


/* Author: Harrison Jansma

* UTD ID: HSJ180000

* CS 5348.001 Operating Systems

* Prof. S Venkatesan

* Project - 3*

***************

* Compilation :-$ gcc -o v6 v6.c -std=c99
* Run using :- $ ./v6


******************/

#include<stdio.h>
#include<string.h>
#include<stdlib.h>
//#include<unistd.h>
//#include<unistd.h>


#define FREE_SIZE 152 //Size of free[] array @ 152 mem addresses
#define I_SIZE 200 // Size of inode[] array @ 200 mem addesses
#define BLOCK_SIZE 1024 // double standard block size
#define ADDR_SIZE 11 // Size of address array in i-node
#define INPUT_SIZE 256 // maximum input from CLI


// Superblock Structure
typedef struct {
    unsigned short isize;
    unsigned short fsize;
    unsigned short nfree;
    unsigned short ninode;
    unsigned int free[FREE_SIZE];
    unsigned short inode[I_SIZE];
    char flock;
    char ilock;
    unsigned short fmod;
    unsigned short time[2];
} superblock_type;


// I-Node Structure (62 bytes)
typedef struct {
    unsigned short flags;
    unsigned short nlinks;
    unsigned short last_addr_block;
    unsigned short last_addr_block_pos;
    unsigned int is_dir;
    unsigned int addr[ADDR_SIZE];  // 11*4 = 44 bytes
    unsigned short actime[2];
    unsigned short modtime[2];
} inode_type;

//Directory Data Block struct
typedef struct {
    unsigned short inode;
    unsigned char filename[14];  // max file name 14 characters
} dir_type;

int initfs(char* path, unsigned short total_blcks, unsigned short total_inodes);
void add_block_to_free_list(int blocknumber, unsigned int *empty_buffer);
void create_root();
inode_type create_inode(int inode_addr, int is_dir);
superblock_type read_superblock();
inode_type read_inode(int inode_addr);
int add_block_addr_to_inode(int dblock_addr, int inode_addr, inode_type *inode);
int preInitialization();
int cpin();
int cpout();
int ls();
int cat();
int add_dblock_to_inode(inode_type *self_inode, int inode_addr, int dblock_addr);
int write_dir_type_to_dblock(inode_type *self_inode, int inode_addr, dir_type dir);
int cd();
int mkdir();
int get_inode_from_working_dir(char* fname, int to_delete);
int rm();
int scan_inode_for_file(inode_type inode, char* fname, int to_delete);

superblock_type superBlock;
inode_type root_inode;
int working_dir_inode;
char* wdir_name= ".";
dir_type root;


FILE* fileDescriptor ;		//file descriptor
const unsigned short inode_alloc_flag = 0100000;
const unsigned short dir_flag = 040000;
const unsigned short dir_large_file = 010000;
const unsigned short dir_access_rights = 000777; // User, Group, & World have all access privileges
const unsigned short INODE_SIZE = 64; // inode has been doubled
int was_init=0;
int debug=0;




int main() {

    char input[INPUT_SIZE];
    char *splitter;
    //unsigned int numBlocks = 0, numInodes = 0;
    //char *filepath;
    printf("Enter command:\n");

    while(1) {
        printf("\nUSER@lenoox %s/" , wdir_name);
        printf("$" );
        scanf(" %[^\n]s", input);
        splitter = strtok(input," ");

        if(strcmp(splitter, "initfs") == 0){ //match command too init_fs
            if (was_init==0) {
                preInitialization();
            }
            else{
                printf("File system already initalized");
            }
            was_init=1;
            splitter = NULL;
        }
        else if(strcmp(splitter, "cpin") == 0){ //match command too init_fs
            if (was_init==1) {
                cpin();
            }
            else{
                printf("File not yet initalized");
            }
            splitter = NULL;
        }
        else if(strcmp(splitter, "cpout") == 0){ //match command too init_fs
            if (was_init==1) {
                cpout();
            }
            else{
                printf("File not yet initalized");
            }
            splitter = NULL;
        }
        else if(strcmp(splitter, "ls") == 0){ //match command too init_fs
            if (was_init==1) {
                ls();
            }
            else{
                printf("File not yet initalized");
            }
            splitter = NULL;
        }
        else if(strcmp(splitter, "cat") == 0){ //match command too init_fs
            if (was_init==1) {
                cat();
            }
            else{
                printf("File not yet initalized");
            }
            splitter = NULL;
        }
        else if(strcmp(splitter, "cd") == 0){ //match command too init_fs
            if (was_init==1) {
                cd();
            }
            else{
                printf("File not yet initalized");
            }
            splitter = NULL;
        }
        else if(strcmp(splitter, "mkdir") == 0){ //match command too init_fs
            if (was_init==1) {
                mkdir();
            }
            else{
                printf("File not yet initalized");
            }
            splitter = NULL;
        }
        else if(strcmp(splitter, "rm") == 0){ //match command too init_fs
            if (was_init==1) {
                rm();
            }
            else{
                printf("File not yet initalized");
            }
            splitter = NULL;
        }
        else if (strcmp(splitter, "q") == 0) {
            return 0;
        }
        else {
            printf("Invalid command provided");
            splitter = NULL;
        }
    }
}


//#############################################################################//
// INITIALIZATION SECTION
//#############################################################################//

int preInitialization(){
/*Check if file exists and can be opened. If file exists load superblock and root, else create new file system (initfs)*/
    char *n1, *n2;
    unsigned int numBlocks = 0, numInodes = 0;
    char *filepath;


    filepath = strtok(NULL, " ");
    n1 = strtok(NULL, " ");
    n2 = strtok(NULL, " ");


    if(fileDescriptor = fopen(filepath, "r+")){ // File opens & exists test
        printf("filesystem already exists and the same will be used.\n");
        superBlock =  read_superblock();
        root_inode = read_inode(1);
        working_dir_inode = 1;
        return (1);
        if (debug){
            printf("\nROOT NODE CONFIG\n" );
            printf("last_addr_block: %hu\n", root_inode.last_addr_block);
            printf("last_addr_block_pos: %hu\n", root_inode.last_addr_block_pos);
            printf(".addr[0] %d\n", root_inode.addr[0]);
        }

    }
    else {
        if (!n1 || !n2)
            printf(" All arguments(path, number of inodes and total number of blocks) have not been entered\n");

        else {
            numBlocks = atoi(n1);
            numInodes = atoi(n2);

            if( initfs(filepath, numBlocks, numInodes )){
                working_dir_inode = 1;
                printf("The file system is initialized\n");
            } else {
                printf("Error initializing file system. Exiting... \n");
                return(1);
            }
        }
    }
}


int initfs(char* path, unsigned short blocks, unsigned short inodes) {
/*Fill and save SuperBlock*/


    fileDescriptor = fopen(path, "w+");

    // Enter data for SuperBlock
    unsigned short i;
    i = 0;
    superBlock.fsize = blocks;
    unsigned short inodes_per_block= BLOCK_SIZE/INODE_SIZE; // 16 i nodes per block
    if((inodes%inodes_per_block) == 0)
        superBlock.isize = inodes/inodes_per_block;
    else
        superBlock.isize = (inodes/inodes_per_block) + 1; // put the extra i nodes in a final block

    superBlock.nfree = 0;
    for (i = 0; i < FREE_SIZE; i++)
        superBlock.free[i] =  0;			//initializing free array to 0

    if (inodes<I_SIZE){
        superBlock.ninode = inodes-1;
        for (i = 1; i < inodes; i++) //skip first i-node (save for root)
            superBlock.inode[i-1] = i+1;		//Initialize the free inode array to inode numbers
    }
    else{
        superBlock.ninode = I_SIZE;
        for (i = 1; i < I_SIZE+1; i++) //skip first i-node (save for root)
            superBlock.inode[i-1] = i+1;		//Initialize the free inode array to inode numbers
    }

    superBlock.flock = 'a'; 					//flock,ilock and fmode are not used.
    superBlock.ilock = 'b';
    superBlock.fmod = 0;
    superBlock.time[0] = 0;
    superBlock.time[1] = 1970;

    fseek(fileDescriptor, BLOCK_SIZE, SEEK_SET);
    fwrite(&superBlock, BLOCK_SIZE, 1, fileDescriptor); // writing superblock to file system

    unsigned int buffer[BLOCK_SIZE/4]; // one block buffer
    for (i = 0; i < BLOCK_SIZE/4; i++)
        buffer[i] = 0;

    // writing zeroes to all inodes in ilist
    fseek(fileDescriptor, 2*BLOCK_SIZE, SEEK_SET);
    for (i = 0; i < superBlock.isize; i++)
        fwrite(buffer, sizeof(unsigned int), BLOCK_SIZE/4, fileDescriptor);


    // Create root directory
    create_root();

    //write zeroes to all dblocks (skip first iblock and first dblock for root dir)
    for ( i = 2 + superBlock.isize + 1; i < superBlock.fsize; i++ ) {
        add_block_to_free_list(i, buffer);
    }


    return(1);
}


void create_root() {
/*Creates inode for root and puts to dir structs for . and ..*/
    root.inode = 1;
    int root_inode_addr = root.inode;
    int root_data_block = superBlock.isize + 2 ;
    // Fill and write inode 1 and datanode 1 for root dir
    root_inode = create_inode(1, 1);
    add_dblock_to_inode(&root_inode, 1, root_data_block);

    strcpy(root.filename, ".\0");
    write_dir_type_to_dblock(&root_inode, root_inode_addr, root);

    strcpy(root.filename, "..\0");
    write_dir_type_to_dblock(&root_inode, root_inode_addr, root);

}


int save_inode(inode_type self_inode, int inode_addr){
    /*save inode struct at given inode_addr*/
    int i_byte_addr = (2*BLOCK_SIZE)+((inode_addr-1)*INODE_SIZE);
    fseek(fileDescriptor, i_byte_addr, SEEK_SET);
    fwrite(&self_inode, INODE_SIZE, 1, fileDescriptor);
    return(1);
}


int save_superblock(){
    /*save superblock*/
    int i_byte_addr = BLOCK_SIZE;
    fseek(fileDescriptor, i_byte_addr, SEEK_SET);
    fwrite(&superBlock, sizeof(superblock_type), 1, fileDescriptor);
    return(1);
}


inode_type create_inode(int inode_addr, int is_dir){
/*initialize an inode struct and save at given location*/
    int i;
    inode_type i_node;
    // Fill and write inode 1 for root dir
    i_node.flags = inode_alloc_flag | dir_flag | dir_large_file | dir_access_rights;   		// flag for root directory
    i_node.nlinks = 0;
    i_node.last_addr_block = -1;
    i_node.last_addr_block_pos = 0;
    i_node.is_dir = is_dir;
    for( i = 0; i < ADDR_SIZE; i++ ) {
        i_node.addr[i] = 0;
    }
    i_node.actime[0] = 0;
    i_node.modtime[0] = 0;
    i_node.modtime[1] = 0;

    save_inode(i_node, inode_addr);

    return(i_node);
}


superblock_type read_superblock(){
    /*Reads in the superblock  at location 1024 of filesys*/
    superblock_type super_Block;
    fseek(fileDescriptor, BLOCK_SIZE, SEEK_SET);
    fread(&super_Block, sizeof(superblock_type), 1, fileDescriptor);
    return(super_Block);
}


inode_type read_inode(int inode_addr){
    /*reads in an inode struct given the inode_addr*/
    int i_byte_addr = (2*BLOCK_SIZE)+((inode_addr-1)*INODE_SIZE);
    inode_type i_node;
    fseek(fileDescriptor, i_byte_addr, SEEK_SET);
    fread(&i_node, sizeof(inode_type), 1, fileDescriptor);
    return(i_node);
}


// COPY IN SECTION

void add_block_to_free_list(int block_number,  unsigned int *empty_buffer){
    if ( superBlock.nfree == FREE_SIZE ) {

        int free_list_data[BLOCK_SIZE / 4], i; // 1024 size blocks
        free_list_data[0] = FREE_SIZE;

        for ( i = 0; i < BLOCK_SIZE / 4; i++ ) {
            if ( i < FREE_SIZE ) {
                free_list_data[i + 1] = superBlock.free[i];
            } else {
                free_list_data[i + 1] = 0; // getting rid of junk data in the remaining unused bytes of header block
            }
        }
        fseek(fileDescriptor, (block_number) * BLOCK_SIZE, SEEK_SET);
        fwrite(free_list_data, BLOCK_SIZE, 1, fileDescriptor); // Writing free list to header block
        superBlock.nfree = 0;

    } else {
        fseek(fileDescriptor, (block_number) * BLOCK_SIZE, SEEK_SET);
        fwrite(empty_buffer, BLOCK_SIZE, 1, fileDescriptor);  // writing 0 to remaining data blocks to get rid of junk data
    }

    superBlock.free[superBlock.nfree] = block_number;  // Assigning blocks to free array
    superBlock.nfree++;
}


int get_free_dblock(){
    /*retrieve a free block from free[]*/
    superBlock.nfree--;
    int dblock_addr = superBlock.free[superBlock.nfree];
    save_superblock();
    if (debug){
        printf("\nGET_FREE_DBLOCK\n" );
        printf("%d\n", dblock_addr);
    }
    return(dblock_addr);
}


int get_free_inode(){
    /*retrieve a free inode from inode[]*/
    if (debug){
        printf("\nGET_FREE_INODE\n" );
        printf("%d\n", superBlock.inode[superBlock.ninode-1]);
    }
    superBlock.ninode--;
    int dblock_addr = superBlock.inode[superBlock.ninode];
    save_superblock();
    return(dblock_addr);
}


int add_dblock_to_inode(inode_type *self_inode, int inode_addr, int dblock_addr){
    /*Adds an addr[] entry into a given inode.*/
    self_inode->last_addr_block++;
    self_inode->last_addr_block_pos=0;
    self_inode->addr[self_inode->last_addr_block] = dblock_addr;
    save_inode(*self_inode, inode_addr);
    return(1);
}


int write_dir_type_to_dblock(inode_type *self_inode, int inode_addr, dir_type dir){
    /*Writes a directory struct (file+inode_addr) to the dblock of a directory*/
    int last_pos = self_inode->last_addr_block_pos;
    int dblock_addr = self_inode->addr[self_inode->last_addr_block];

    if ((BLOCK_SIZE-last_pos)<16){
        int new_dblock = get_free_dblock();
        add_dblock_to_inode(self_inode, inode_addr, new_dblock);
        int last_pos = self_inode->last_addr_block_pos;
        int dblock_addr = self_inode->addr[self_inode->last_addr_block];
    }
    fseek(fileDescriptor, (dblock_addr*BLOCK_SIZE)+last_pos, SEEK_SET);
    fwrite(&dir, 16, 1, fileDescriptor);
    self_inode->last_addr_block_pos += 16;
    save_inode(*self_inode, inode_addr);

    return(1);
}



int add_inode_addr_to_parent_dir(int parent_inode_addr, int inode_addr, char* fname){
    /*When creating a file, save the new inode_addr as file_dir in root*/

    inode_type parent_inode = read_inode(parent_inode_addr);

    dir_type dir_dblock;
    dir_dblock.inode = inode_addr;
    strcpy(dir_dblock.filename, fname);

    write_dir_type_to_dblock(&parent_inode, parent_inode_addr, dir_dblock);
    return(1);
}



int cpin(){
    /*Coy a file from working directory into the root directory of the new filesys*/
    char *srcpath, *dstpath;
    srcpath = strtok(NULL, " ");
    dstpath = strtok(NULL, " ");
    FILE * fp;
    char* filename;
    int k=0, dblock_addr, inode_addr;
    char c;
    char parentpath[100];


    //EDGE CASE HANDLING
    if (!srcpath || !dstpath){
        printf("arguments missing!\n Usage:\n cpin srcpath dstpath\n");
        return(0);
    }
    if(strchr(dstpath,'/')!=NULL){
        if (strlen(strrchr(dstpath,'/'))>14){
            printf("Destination file \"%s\" must be shorter than 14 characters", strrchr(dstpath,'/'));
            printf("Current length %i", strlen(strrchr(dstpath,'/')));
            return(0);
        }
    }
    else{
        if (strlen(dstpath)>14){
            printf("Destination file \"%s\" must be shorter than 14 characters", dstpath);
            printf("Current length %i", dstpath);
            return(0);
        }
    }
    if(get_inode_from_working_dir(dstpath, 0)!=-1){
        printf("File already exists %s\n",  dstpath);
        printf("No overwriting allowed ya lazy bum!");
        return(0);
    }
    if(!fopen(srcpath, "r")){
        printf("Source file does not exists (or cannot be opened): %s", srcpath);
        return(0);
    }


    fp = fopen(srcpath,"r");
    fseek(fp, 0, SEEK_SET);

    if(strchr(dstpath,'/')!=NULL) { //dstpath is a directory path
        strcpy(parentpath, dstpath);
        char* last = strrchr(parentpath,'/');
        *last = '\0';
        filename = strrchr(dstpath,'/')+1;
    }
    else{ //dstpath is a filename->parent path is working dir
        strcpy(parentpath, ".");
        filename = dstpath;
    }

    int parent_inode = get_inode_from_working_dir(parentpath, 0);

    //Create file inode and link to patent inode
    inode_addr = get_free_inode();
    add_inode_addr_to_parent_dir(parent_inode, inode_addr, filename);

    inode_type inode = create_inode(inode_addr, 0);

    //write file contents to datablock
    while(!feof(fp)){

        dblock_addr = get_free_dblock();
        add_dblock_to_inode(&inode, inode_addr, dblock_addr);

        fseek(fileDescriptor, BLOCK_SIZE*dblock_addr, SEEK_SET);
        c = getc(fp);
        while((c!=EOF) && (k<BLOCK_SIZE)){
            putc(c, fileDescriptor);
            c = getc(fp);
            k++;
        }
        inode.last_addr_block_pos += k;
        save_inode(inode, inode_addr);
        k=0;

    }

    return(1);
}



// COPY OUT SECTION
int get_inode_from_working_dir(char* fname, int to_delete){
    /*Retrieve the inode_addr for a given filename if exists*/

    if(strchr(fname,'/')!=NULL){
        //string contains "/", search required

        char strbuffer[100];
        strcpy(strbuffer,fname);

        char* currfile = strtok(strbuffer,"/");
        int next_inode_addr = working_dir_inode;
        inode_type next_inode = read_inode(next_inode_addr);
        inode_type next_next_inode;

        while (currfile!=NULL){
            if(to_delete==1){ //delete the final file in chain if to_delete=1
                next_inode_addr = scan_inode_for_file(next_inode, currfile, 0);
                next_next_inode = read_inode(next_inode_addr);
                if(!next_next_inode.is_dir){
                    next_inode_addr = scan_inode_for_file(next_inode, currfile, to_delete);
                }
            }else{
                next_inode_addr = scan_inode_for_file(next_inode, currfile, 0);
            }
            if (next_inode_addr==-1){ //next file name not found -> return -1
                return next_inode_addr;
            }
            else{
                next_inode = read_inode(next_inode_addr);
                currfile = strtok(NULL,"/");
            }
        }
        return next_inode_addr; //return inode of final file in chain
    }
    else{
        inode_type wrking_dir_inode = read_inode(working_dir_inode);
        return  scan_inode_for_file(wrking_dir_inode, fname, to_delete);
    }

}


int scan_inode_for_file(inode_type inode, char* fname, int to_delete){
    int i, j;
    int files_rem;
    dir_type curr_file;

    //loop through dir objects in working dir
    for (i=0; i<=inode.last_addr_block; i++){

        files_rem = BLOCK_SIZE/16;
        fseek(fileDescriptor, inode.addr[i]*BLOCK_SIZE, SEEK_SET);

        if(i==inode.last_addr_block)
            files_rem = inode.last_addr_block_pos/16;

        for (j=0; j<=files_rem; j++){
            fread(&curr_file, sizeof(dir_type), 1, fileDescriptor);
            if (strcmp(curr_file.filename, fname)==0){
                if (to_delete==1){
                    dir_type overwrite;
                    overwrite.inode = 0;
                    strcpy(overwrite.filename, "");
                    fseek(fileDescriptor,-sizeof(dir_type),SEEK_CUR);
                    fwrite(&overwrite, 16, 1, fileDescriptor);
                }
                return(curr_file.inode);
            }
        }
    }
    //Not found
    return(-1);
}


int ls(){
/*print all files in the root directory*/
    dir_type curr_file;
    int i,j;
    int files_rem;
    int root_dblock;
    int parent_inode_addr;

    char* other_command;
    other_command = strtok(NULL, " ");

    if (other_command==NULL){
        parent_inode_addr = working_dir_inode;
    }
    else{
        if(get_inode_from_working_dir(other_command, 0)==-1){
            printf("File does not exist %s\n",  other_command);
            return(0);
        }
        parent_inode_addr = get_inode_from_working_dir(other_command, 0);
    }

    inode_type parent_inode = read_inode(parent_inode_addr);

    if (!parent_inode.is_dir){
        printf("Path is a file, not dir");
        return 0;
    }

    for (i=0; i<=parent_inode.last_addr_block; i++){
        files_rem = BLOCK_SIZE/16;
        fseek(fileDescriptor, parent_inode.addr[i]*BLOCK_SIZE, SEEK_SET);
        if(i==parent_inode.last_addr_block)
            files_rem = parent_inode.last_addr_block_pos/16;
        for (j=0; j<=files_rem;j++){
            fread(&curr_file, sizeof(dir_type), 1, fileDescriptor);
            if (strlen(curr_file.filename)!=0) {
                printf("%s\n", curr_file.filename);
            }
        }
    }
    return(1);
}


int cat(){
    /*print the contents of a file*/
    char *fname;
    fname = strtok(NULL, " ");

    //EDGE CASES: no path / path doesnt exist
    if (!fname){
        printf("arguments missing!\n Usage:\n cat fname\n");
        return(0);
    }
    if(get_inode_from_working_dir(fname, 0)==-1){
        printf("File does not exist %s\n",  fname);
        return(0);
    }

    char c ='a';
    int rem_byts_in_block, dblock_addr, i, j=0;

    int inode_addr = get_inode_from_working_dir(fname, 0);

    if(inode_addr==-1){
        printf("Unable to find file %s\n",  fname);
        return(0);
    }
    inode_type inode = read_inode(inode_addr);

    //EDGE CASE: Path is dir
    if (inode.is_dir){
        printf("selected path is directory: %s", fname);
        return(0);
    }

    for (i=0; i<=inode.last_addr_block; i++){
        rem_byts_in_block = BLOCK_SIZE;
        dblock_addr = inode.addr[i];
        fseek(fileDescriptor, dblock_addr*BLOCK_SIZE, SEEK_SET);
        if (i==inode.last_addr_block){
            rem_byts_in_block = inode.last_addr_block_pos;
        }
        while ((c!=EOF) && (j<rem_byts_in_block)){
            c = getc(fileDescriptor);
            printf("%c", c);
            j++;
        }
        printf("\n" );
    }
}


int cpout(){
    /*copies a given file from filesys to the working directory*/
    char *srcpath, *dstpath;

    srcpath = strtok(NULL, " ");
    dstpath = strtok(NULL, " ");

    //EDGE CASES
    if (!srcpath || !dstpath){
        printf("arguments missing!\n Usage:\n cpout srcpath dstpath\n");
        return(0);
    }
    if(get_inode_from_working_dir(srcpath, 0)==-1){
        printf("File does not exists %s\n",  srcpath);
        return(0);
    }
    if(!fopen(dstpath,"w+")){
        printf("Cant write to destination file %s", dstpath);
        return(0);
    }

    FILE* fp = fopen(dstpath,"w+");
    fseek(fp,0,SEEK_SET);

    char c='a';
    int dblock_addr, rem_byts_in_block, k=0;

    int inode_addr = get_inode_from_working_dir(srcpath, 0);
    inode_type inode = read_inode(inode_addr);

    for (int i=0; i<=inode.last_addr_block; i++){
        rem_byts_in_block = BLOCK_SIZE;
        dblock_addr = inode.addr[i];
        if (i==inode.last_addr_block)
            rem_byts_in_block = inode.last_addr_block_pos;

        fseek(fileDescriptor, BLOCK_SIZE*dblock_addr, SEEK_SET);
        while((c!=EOF) && (k<=rem_byts_in_block)){
            fseek(fp, ftell(fp), SEEK_SET);
            c = getc(fileDescriptor);
            putc(c, fp);
            k++;
        }
        k=0;

    }
    return(0);
}


char* concat(const char *s1, const char *s2)
{
    char *result = malloc(strlen(s1) + strlen(s2) + 1); // +1 for the null-terminator
    // in real code you would check for errors in malloc here
    strcpy(result, s1);
    strcat(result, s2);
    return result;
}


int cd(){
    /*change the working directory*/
    char *dstpath;
    char *dot_dot = "..";
    dstpath = strtok(NULL, " ");

    //EDGE CASES
    if (!dstpath){
        printf("arguments missing!\n Usage:\n cd dstpath\n");
        return(0);
    }
    if(get_inode_from_working_dir(dstpath, 0)==-1){
        printf("Directory does not exists %s\n",  dstpath);
        return(0);
    }

    int matched_inode = get_inode_from_working_dir(dstpath, 0);
    inode_type working_inode = read_inode(matched_inode);

    if (working_inode.is_dir==1){
        if(strcmp(dstpath,".")==0){
            return 1;
        }
        else if(strcmp(wdir_name,".")==0 && strcmp(dstpath,dot_dot)==0){
            return 1;
        }
        else if (strcmp(dstpath,dot_dot)==0 && strcmp(wdir_name,".")!=0){
            char* last = strrchr(wdir_name,'/');
            *last = '\0';
        }
        else{
            wdir_name =  concat(wdir_name, "/");
            wdir_name =  concat(wdir_name, dstpath);
        }
        working_dir_inode = matched_inode;
        return(1);
    }
    else{
        printf("Not a directory: %s", dstpath);
        return(0);
    }
}


int mkdir(){
    /*Make a new directory in working directory*/
    char *new_dir;

    new_dir = strtok(NULL, " ");

    //EDGE CASES
    if ( !new_dir){
        printf("arguments missing!\n Usage:\n cd dstpath\n");
        return(0);
    }
    if (strlen(new_dir)>13){
        printf("filename too long: %s", new_dir);
        return 0;
    }
    if(get_inode_from_working_dir(new_dir, 0)!=-1){
        printf("Directory already exists %s\n",  new_dir);
        return(0);
    }
    if(strchr(new_dir,'/')!=NULL) {
        printf("Found '/' in path: %s", new_dir);
        printf("mkdir can only  create one dir at a time");
        return 1;
    }

    int parent_addr = working_dir_inode;
    int inode_addr = get_free_inode();
    add_inode_addr_to_parent_dir(working_dir_inode, inode_addr, new_dir);

    inode_type inode = create_inode(inode_addr, 1);
    int dblock = get_free_dblock();
    add_dblock_to_inode(&inode, inode_addr, dblock);

    //Add .. and . to new directory
    add_inode_addr_to_parent_dir( inode_addr, inode_addr, ".\0");
    add_inode_addr_to_parent_dir( inode_addr, parent_addr, "..\0");

    return(1);
}


int rm(){
    /*Make a new directory in working directory*/
    char *to_delete;
    to_delete = strtok(NULL, " ");
    char* filename = strrchr(to_delete,'/');

    //EDGE CASES
    if ( !to_delete){
        printf("arguments missing!\n Usage:\n cd dstpath\n");
        return(0);
    }
    if(get_inode_from_working_dir(to_delete, 0)==-1){
        printf("File not found: %s\n",  to_delete);
        return(0);
    }

    int dblock_addr, i;
    unsigned int buffer[BLOCK_SIZE/4]; // one block buffer
    for (i = 0; i < BLOCK_SIZE/4; i++)
        buffer[i] = 0;


    int inode_addr = get_inode_from_working_dir(to_delete, 1);
    inode_type inode = read_inode(inode_addr);
    for ( i=0; i<=inode.last_addr_block; i++){
        dblock_addr = inode.addr[i];
        add_block_to_free_list( dblock_addr,  buffer);
    }
    return 1;
}
