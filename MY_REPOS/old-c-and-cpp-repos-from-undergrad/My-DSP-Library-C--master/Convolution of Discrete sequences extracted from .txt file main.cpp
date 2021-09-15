#include <iostream>
#include <fstream>

#define SIG_LENGTH 320
#define IMP_RSP_LENGTH 29
using namespace std;

extern double InputSignal_f32_1kHz_15kHz[SIG_LENGTH];
extern double  Impulse_response[IMP_RSP_LENGTH];
double OutputSignal[SIG_LENGTH +IMP_RSP_LENGTH];


void convolution(double *sig_src_arr,double *sig_dest_arr,double *imp_response_arr,int  sig_src_length,int  imp_response_length);
int main()
{
    ofstream file1,file2;

 convolution(
                 (double *)&InputSignal_f32_1kHz_15kHz[0],
                 (double *)&OutputSignal[0],
                 (double *)&Impulse_response[0],
                 (int) SIG_LENGTH,
                 (int)  IMP_RSP_LENGTH
                 );
    file1.open("output_signal.dat");
    file2.open("input_signal.dat");

    for(int i =0;i<SIG_LENGTH+IMP_RSP_LENGTH;i++){

        file1<<OutputSignal[i]<<endl;
        if(i <SIG_LENGTH){
        file2<<InputSignal_f32_1kHz_15kHz[i]<<endl;
        }
    }
    file1.close();
    file2.close();
    return 0;
}



void convolution(
                 double *sig_src_arr,
                 double *sig_dest_arr,
                 double *imp_response_arr,
                 int  sig_src_length,
                 int  imp_response_length
                 )
{

    int i,j;
    for(i =0;i<(sig_src_length+ imp_response_length);i++)
    {

        sig_dest_arr[i] = 0;
    }

     for(i =0;i<sig_src_length;i++)
     {

         for(j =0;j<imp_response_length;j++)
         {
             sig_dest_arr[i+j] =  sig_dest_arr[i+j] + sig_src_arr[i]*imp_response_arr[j];

         }
     }
}
