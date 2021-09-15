% using Newton Method on Beattie Bridgeman
P1=100; % K-pascals
P2=6000;
T=293; %kelvin
Ru=8.314;%J/mol-K
%constants from table
Ao=507.2836;
a=0.07132;
Bo=0.10476;
b=0.07235;
C=660000;
%end of constants


P=P1;%allowable error
P2=P2+i; %estimate of distance to root
v=zeros(1,6000/i);
v(1:1)= 0.55347; % use ideal gas law for first estimate [ (R*T/Pinitial) ]
n=1;
while P<P2
    n=n+1;
    V=v(1,n-1);
    A=Ao*(1-(a/V));
    B=Bo*(1-(b/V));
   f=-(A/(V)^2)-((B*C*Ru)/((T^2)*(V^3)))+((B*Ru*T)/(V^2))-((C*Ru)/((T^2)*(V^2)))+((Ru*T)/(V))-P;
   df=-A*(T^2)+B*Ru*(T^3)-C*Ru+0.5*Ru*(T^3)*V-0.33*P*(T^2)*(V^2);
    v(1,n)=V-(f/df);
   P=P+i;
end
disp(v)
plot(v);
