package me.ashish.generators;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import me.ashish.common.ExampleLoan;
import me.ashish.common.LoanApplication;

import java.io.IOException;

public class ProducingWIthBindingAPI {
    public static void main(String[] args) throws IOException {
        LoanApplication loanApplication = ExampleLoan.LOAN_APPLICATION;
        System.out.println(loanApplication);
        System.out.println();
        toJsonString(loanApplication);
    }

    private static void toJsonString(final LoanApplication loanApplication) throws IOException
    {
        String jsonString = new ObjectMapper().writeValueAsString(loanApplication);
        System.out.println(jsonString);
    }
}
