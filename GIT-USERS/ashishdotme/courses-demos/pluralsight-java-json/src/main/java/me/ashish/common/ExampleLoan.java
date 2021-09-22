package me.ashish.common;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

public class ExampleLoan {
    public static final LoanApplication LOAN_APPLICATION;

    static {
        final LoanDetails loanDetails = new LoanDetails();
        loanDetails.setAmount(10000.00);
        loanDetails.setStartDate(LocalDate.of(2018, Month.JANUARY, 15));
        loanDetails.setEndDate(LocalDate.of(2023, Month.JANUARY, 15));

        final List<Job> jobs = new ArrayList<>();

        Job job = new Job();
        job.setTitle("Freelance Developer");
        job.setAnnualIncome(18000);
        job.setYearsActive(3);
        jobs.add(job);

        job = new Job();
        job.setTitle("Part Time Developer");
        job.setAnnualIncome(18000);
        job.setYearsActive(3);
        jobs.add(job);

        job= new Job();
        job.setTitle("Pluralsight Developer");
        job.setAnnualIncome(18000);
        job.setYearsActive(3);
        jobs.add(job);

        LOAN_APPLICATION = new LoanApplication();
        LOAN_APPLICATION.setName("Mrs Joan Smith");
        LOAN_APPLICATION.setPurposeOfLoan("To build an extension to my house");
        LOAN_APPLICATION.setLoanDetails(loanDetails);
        LOAN_APPLICATION.setJobs(jobs);
    }

}
