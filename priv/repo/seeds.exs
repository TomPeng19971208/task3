# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Task3.Repo.insert!(%Task3.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Task3.Repo
alias Task3.Users.User
alias Task3.Users
alias Task3.Tasks.Task
alias Task3.Tasks
pwhash = Argon2.hash_pwd_salt("P@ssw0rd")
peng=Repo.insert!(%User{name: "peng", password_hash: pwhash})
Repo.insert!(%Task{title: "peng-task", description: "des", time: 0, finished: false, user_id: peng.id})
