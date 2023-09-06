class User < ApplicationRecord
  def self.ransackable_attributes(auth_object = nil)
      ['username']
  end
end
