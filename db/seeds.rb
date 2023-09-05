require 'httparty'

response = HTTParty.get('https://jsonplaceholder.typicode.com/users')
users_data = JSON.parse(response.body)

start_id = 1

users_data.each do |user_data|
  User.create(
    id: start_id,
    name: user_data['name'],
    username: user_data['username'],
    email: user_data['email'],
    address: "#{user_data['address']['street']}, #{user_data['address']['suite']}, #{user_data['address']['city']}, #{user_data['address']['zipcode']}",
    phone: user_data['phone']
  )
  start_id += 1
end

puts 'Kullanıcılar başarıyla eklenmiştir.'
