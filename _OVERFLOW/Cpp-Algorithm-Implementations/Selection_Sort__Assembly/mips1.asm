.data
arr: .word 8, 12, 5, 2

.text
.globl main
main:
la  $s4, arr
Addi $t0,$t0,0			#$t0 = c = 0
LOOP: slti $t1,$t0,3		#c < (n-1)  -> EXIT
	beq $t1, $zero, EXIT
	add $t1,$t0,$zero		#$t1 = position = c
	addi $t2,$t0,1                #$t2 = d = c+1
	LOOP2: slti $t3,$t2,4		# d < n -> EXIT2
		beq $t3, $zero, EXIT2
		sll $t3, $t1,2     	#$t3 = Array[position]
		add $t3, $t3,$s4
		lw $t3, 0($t3)
		sll $t4,$t2,2		#$t4 = Array[d]
		add $t4, $t4,$s4
		lw $t4, 0($t4)		
		slt $t5, $t4, $t3	# Array[position]>Array[d]->SKIP
		beq $t5, $zero, SKIP
		add $t1, $t2, $zero	#$t1 = position = d
		SKIP: addi $t2, $t2,1	# d++
		j LOOP2		
	EXIT2:beq $t1,$t0, SKIPSWAP
		Sll $t3,$t0,2		# $t5 = Array[c]
		Add $t3, $t3, $s4	#$t3 = c_loc
		Lw  $t5, 0($t3)
		Sll $t4,$t1,2		# $t6 = Array[position]
		Add $t4, $t4, $s4	#$t4 = positon_loc
		Lw $t6, 0($t4)
		Sw $t5, 0($t4)		#SWAP
		Sw $t6, 0($t3)
	SKIPSWAP: addi $t0,$t0,1  	# c++
		j LOOP
EXIT:
lw $s0,0($s4)
lw $s1,4($s4)
lw $s2,8($s4)
lw $s3,12($s4)
