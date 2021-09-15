format long
%problem constants:
T=293; %kelv(1,n)n
Ru=8.314;%J/mol-K

%constants from table:
Ao=507.2836;
A=440.971;
B=0.091006;
a=0.07132;
Bo=0.10476;
b=0.07235;
C=660000;
%end of constants

%initializations
error=0;
P=100:100:6000;%Range of Pressure values used
v=zeros(size(P,2));

vi=0.55347; % use ideal gas law for first estimate [ (R*T/Pinitial) ]
%end of initializations


 for n=1:size(P,2)
while error>=0.00005 %error = allowable tollerance =0.001


 f0 =  f_of_v(P(n),vi);%VDW equation evaluated at a value of pressure and specific volume
 f0p = df_of_v(P(n),vi);%VDW derivative evaluated at a value of pressure and specific volume

 
%f=-(A/vi)-((B*C*Ru)/((T^2)*(vi^3)))+((B*Ru*T)/(vi^2))-((C*Ru)/((T^2)*(vi^2)))+((Ru*T)/(vi))-P(n);
%df=-A*(T^2)+B*Ru*(T^3)-C*Ru+0.5*Ru*(T^3)*vi-0.33*P(n)*(T^2)*(vi^2);    

v=vi-f0/f0p;

error=abs(v-vi);
vi=v;


end
error=1;
vi = .55347;
%v=vi/44.01;
 end
 
 disp(P)
 disp(v)
 
 
 plot(P,v,'ob');
   xlabel('Pressure (KPa)');
   ylabel('Specific Volume (m.^3/Kg)');
   
  