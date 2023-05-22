class Product < ApplicationRecord
  default_scope { order(created_at: :desc) }
  belongs_to :project
  has_one_attached :image

  after_create_commit :broadcast

  private

  def broadcast
    broadcast_prepend_to("#{self.project_id}_products", partial: "products/product", locals: { product: self })
  end
end
