; sector 1
; descriptor 0xaa55
; 512 bytes (the size of a sector of a disk)
mov bp, 0x8000
mov sp, bp

mov ah, 0x0e ; tty mode
mov al, 'A' ; put 'A' (65)
int 0x10 ; call the write interupt

push 'A' ; decrement the sp from 0x8000 to 0x7ffe, insert the data at the address of sp
push 'B' ; decrement the sp from 0x7ffe to 0x7ffc, insert the data at the address of sp
push 'C' ; decrement the sp from 0x7ffc to 0x7ffa, insert the data at the address of sp

; 0x8000 - 2 (0x7ffe)
; make a pointer 0x7ffe, deref the pointer to give the data at that memory address
; to deref the pointer we can use [] brackets
; go to the memory address and return the content [0x7ffe]
mov al, [0x7ffe]
int 0x10

pop cx ; put 2 bytes in to cx

mov al, cl ; set the low byte in cx to the low byte in ax
int 0x10 ; print 'C'

pop cx ; put 2 bytes in to cx

mov al, cl ; set the low byte in cx to the low byte in ax
int 0x10 ; print 'B'

pop cx ; put 2 bytes in to cx

mov al, cl ; set the low byte in cx to the low byte in ax
int 0x10 ; print 'A'

jmp $ ; infinite loop

; some area for data
msg: db "ABCDE", 0 ; the idea of an array in higher level languages
; msg: db 'A', 'B', 'C', 'D', 'E', 0

times 510 - ($-$$) db 0
dw 0xaa55 ; 512 byte mark (end of sector 1)

; sector 2
; after this point will not be loaded at boot times
mov ah, 0x0e ; tty mode
mov al, 'B' ; put 'B' (65)
int 0x10 ; call the write interupt