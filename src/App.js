import React, { useState, useEffect } from "react";
import "./App.css"; // Import an external CSS file if needed

export default function App() {
  const [users, setUsers] = useState([]);
  const [newname, setNewname] = useState("");
  const [newusername, setNewusername] = useState("");
  const [newmail, setNewmail] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((rep) => rep.json())
      .then((data) => setUsers(data));
  }, []);

  function deleteuser(id) {
    const currentid = id;
    setUsers(
      users.filter((user) => {
        return user.id !== currentid;
      })
    );
  }

  function add() {
    if (
      newname.trim() !== "" &&
      newusername.trim() !== "" &&
      newmail.trim() !== ""
    ) {
      const newUser = {
        name: newname,
        username: newusername,
        email: newmail,
      };

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((data) => {
          setUsers((prevUsers) => [...prevUsers, data]);

          setNewname("");
          setNewusername("");
          setNewmail("");
        });
    }
  }

  return (
    <table className="user-table">
      <thead>
        <tr>
          <td>Id</td>
          <td>Name</td>
          <td>Username</td>
          <td>Email</td>
          <td>Delete</td>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => deleteuser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td>
            <input
              type="text"
              placeholder="Name"
              value={newname}
              onChange={(e) => setNewname(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              placeholder="Username"
              value={newusername}
              onChange={(e) => setNewusername(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              placeholder="Email"
              value={newmail}
              onChange={(e) => setNewmail(e.target.value)}
            />
          </td>
          <td>
            <button className="add-button" onClick={add}>
              Add
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
