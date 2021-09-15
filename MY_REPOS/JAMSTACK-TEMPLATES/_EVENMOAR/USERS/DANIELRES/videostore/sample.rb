require_relative "lib/customer"
require_relative "lib/rental"
require_relative "lib/movie"

mad_max = Movie.new("Mad Max", Movie::REGULAR)
poltergeist = Movie.new("Poltergeist", Movie::REGULAR)
the_hobbit = Movie.new("The Hobbit", Movie::NEW_RELEASE)
bambi = Movie.new("Bambi", Movie::CHILDRENS)

customer = Customer.new "Martin Fowler"
customer.add_rental(Rental.new(mad_max, 3))
customer.add_rental(Rental.new(poltergeist, 3))
customer.add_rental(Rental.new(the_hobbit, 3))
customer.add_rental(Rental.new(bambi, 3))

puts customer.statement