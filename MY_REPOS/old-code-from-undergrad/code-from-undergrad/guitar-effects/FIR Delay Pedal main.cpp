#include <iostream>
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int main()
    {
        int maxs = 20000;
        int sum = 0;
        int windex = 0;
        volatile uint16_t n = 10;
        int delay = 2000;
        int k;
        uint16_t x;
        uint16_t gsa[20000] = {0}; //sample array initialized to 0
        CyGlobalIntEnable;         /* Enable global interrupts. */
        Clock_1_Start();
        ADC_SAR_1_Start();
        VDAC8_1_Start();
        LCD_Char_1_Start();
        LCD_Char_1_Position(0u, 0u);
        for (;;)
        {
            LCD_Char_1_ClearDisplay();
            LCD_Char_1_PrintNumber(n); //outputs n to display
            CyDelay(500);
            if (Decrement_n_Read() == 0) // if pressed
            {
                CyDelay(500); //to make sure increment/decrement event registers only once per press
                n = n - 1;    //decrement
            }
            else if (increment_n_Read() == 0)
            {
                CyDelay(500);
                n = n + 1; //Increment
            }
            ADC_SAR_1_IsEndConversion(ADC_SAR_1_WAIT_FOR_RESULT); //polling
            x = ADC_SAR_1_GetResult16();
            gsa[windex] = x; //indexing sample array
            sum = 0;
            for (k = 0; k < n; ++k)
            {
                sum += gsa[(windex + maxs - k * delay) % maxs]; //circular buffer
            }
            sum = sum >> 4;
            sum = sum / n; //Prevents increasing amplitude with every echo
            VDAC8_1_SetValue(sum);
            windex = (windex + 1) % (maxs);
        }
    }
    return 0;
}
