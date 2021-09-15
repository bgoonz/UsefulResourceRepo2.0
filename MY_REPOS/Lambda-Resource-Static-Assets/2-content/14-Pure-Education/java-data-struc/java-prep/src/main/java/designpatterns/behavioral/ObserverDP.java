package designpatterns.behavioral;

import java.util.ArrayList;
import java.util.List;

public class ObserverDP
{
  //  Publishers and subscribers

  interface Publisher
  {
    void register(Observer o);
    void notifyObservers();
    String name();
  }

  interface Observer
  {
    void update(Publisher p, List<String> jobs);
  }

  static class HeadHunter implements Publisher
  {
    private String name;
    private List<Observer> jobSeekers = new ArrayList<>();
    private List<String> jobs = new ArrayList<>();

    public HeadHunter(String name)
    {
      this.name = name;
    }

    @Override
    public void register(Observer o)
    {
      jobSeekers.add(o);
    }

    @Override
    public void notifyObservers()
    {
      for(Observer o : jobSeekers)
      {
        o.update(this, jobs);
      }
    }

    public void addJobs(String job)
    {
      jobs.add(job);
      notifyObservers();
    }

    @Override
    public String name()
    {
      return name;
    }
  }

  static class JobSeeker implements Observer
  {
    private String name;

    public JobSeeker(String name)
    {
      this.name = name;
    }

    @Override
    public void update(Publisher p, List<String> jobs)
    {
      for(String job : jobs)
      {
        System.out.printf("%s received job \"%s\" from \"%s\"\n", name, job, p.name());
      }
    }
  }

  public static void main(String[] args)
  {
    HeadHunter hh = new HeadHunter("JobsRUs");
    hh.register(new JobSeeker("Mike"));
    hh.register(new JobSeeker("Chris"));
    hh.register(new JobSeeker("Jeff"));

    hh.addJobs("Google job");
    hh.addJobs("Apple job");
  }

}
