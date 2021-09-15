# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120624155359) do

  create_table "comments", :force => true do |t|
    t.integer  "commentable_id",   :default => 0
    t.string   "commentable_type", :default => ""
    t.string   "title",            :default => ""
    t.text     "body",             :default => ""
    t.string   "subject",          :default => ""
    t.integer  "user_id",          :default => 0,  :null => false
    t.integer  "parent_id"
    t.integer  "lft"
    t.integer  "rgt"
    t.datetime "created_at",                       :null => false
    t.datetime "updated_at",                       :null => false
  end

  add_index "comments", ["commentable_id"], :name => "index_comments_on_commentable_id"
  add_index "comments", ["user_id"], :name => "index_comments_on_user_id"

  create_table "expressions", :force => true do |t|
    t.text      "body"
    t.text      "meaning"
    t.integer   "author_id"
    t.integer   "language_id"
    t.timestamp "created_at",        :null => false
    t.timestamp "updated_at",        :null => false
    t.string    "source_type"
    t.text      "source_info"
    t.boolean   "created_by_author"
    t.string    "slug"
  end

  add_index "expressions", ["slug"], :name => "index_expressions_on_slug", :unique => true

  create_table "languages", :force => true do |t|
    t.string    "code"
    t.string    "name"
    t.timestamp "created_at", :null => false
    t.timestamp "updated_at", :null => false
  end

  create_table "news", :force => true do |t|
    t.text      "body_en"
    t.text      "body_fr"
    t.integer   "author_id"
    t.timestamp "published_at"
    t.timestamp "created_at",   :null => false
    t.timestamp "updated_at",   :null => false
  end

  create_table "translations", :force => true do |t|
    t.integer  "expression_id"
    t.integer  "language_id"
    t.string   "body_litteral"
    t.string   "body_semantic"
    t.integer  "author_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  create_table "users", :force => true do |t|
    t.string    "email",                  :default => "", :null => false
    t.string    "encrypted_password",     :default => "", :null => false
    t.string    "reset_password_token"
    t.timestamp "reset_password_sent_at"
    t.timestamp "remember_created_at"
    t.integer   "sign_in_count",          :default => 0
    t.timestamp "current_sign_in_at"
    t.timestamp "last_sign_in_at"
    t.string    "current_sign_in_ip"
    t.string    "last_sign_in_ip"
    t.timestamp "created_at",                             :null => false
    t.timestamp "updated_at",                             :null => false
    t.string    "name"
    t.string    "confirmation_token"
    t.timestamp "confirmed_at"
    t.timestamp "confirmation_sent_at"
    t.string    "unconfirmed_email"
    t.string    "role"
    t.string    "avatar_type"
    t.string    "slug"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true
  add_index "users", ["slug"], :name => "index_users_on_slug", :unique => true

end
