package carportal;

import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;

public class SessionFactoryHelper{

	private static final SessionFactory sessionFactory = createSessionFactory();

	private static SessionFactory createSessionFactory(){
		final Configuration configuration = new Configuration().configure();
		final StandardServiceRegistry registryBuilder = new StandardServiceRegistryBuilder().applySettings(configuration.getProperties())
				.build();
		return configuration.buildSessionFactory(registryBuilder);
	}

	public static SessionFactory getSessionFactory(){
		return sessionFactory;
	}
}
