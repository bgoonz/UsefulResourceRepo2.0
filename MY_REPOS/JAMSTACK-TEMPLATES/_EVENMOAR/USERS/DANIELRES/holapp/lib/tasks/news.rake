namespace :news do


  desc "Sends a customized news digest to each user"
  task :send_digests, [:user_id] => [:environment] do |t, args|

    if args[:user_id].nil?
      puts ""
      puts "please specify the user_id of the sender like this:"
      puts "  rake news:send_digests[user_id]"
      puts ""
      puts "Users:"
      User.all.each do |u|
        puts "  #{ u.id }: #{ u.name }"
      end
    end

    sender_user = User.find(args.user_id)
    News::SendingAllDigestEmails.new(sender_user).call

  end

end
