import Layout from "@/Layouts/Layout";
import { useFetch } from "@/hooks/useFetch";
import { Input } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NewStudent() {
  const router = useRouter();
  const { loading, post } = useFetch();

  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const addNewStudent = async () => {
    try {
      const { data, status } = await post("/students", {}, student);
      if (status !== 200) {
        console.log(data);
        return;
      }

      router.push("/admin/students");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Input
        type="text"
        placeholder="First Name"
        value={student.firstName}
        onChange={(e) => setStudent({ ...student, firstName: e.target.value })}
      />
      <Input
        type="text"
        placeholder="Last Name"
        value={student.lastName}
        onChange={(e) => setStudent({ ...student, lastName: e.target.value })}
      />
      <Input
        type="email"
        placeholder="Email"
        value={student.email}
        onChange={(e) => setStudent({ ...student, email: e.target.value })}
      />
      <Input
        type="text"
        placeholder="Password"
        value={student.password}
        onChange={(e) => setStudent({ ...student, password: e.target.value })}
      />
      <Input
        type="text"
        placeholder="Phone"
        value={student.phone}
        onChange={(e) => setStudent({ ...student, phone: e.target.value })}
      />
      <button onClick={addNewStudent}>Add</button>
    </Layout>
  );
}
