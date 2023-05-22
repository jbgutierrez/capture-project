class Project < ApplicationRecord
  has_many :products, dependent: :destroy
end
