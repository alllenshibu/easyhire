import Layout from "@/Layouts/Layout";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  const addNewStudent = async (e) => {
    e.preventDefault();
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
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-gray-500 dark:text-gray-400">Fill out the form to get started.</p>
        </div>
        <form className="space-y-4" onSubmit={addNewStudent}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                placeholder="John"
                value={student.firstName}
                onChange={(e) => setStudent({ ...student, firstName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                placeholder="Doe"
                value={student.lastName}
                onChange={(e) => setStudent({ ...student, lastName: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              value={student.email}
              onChange={(e) => setStudent({ ...student, email: e.target.value })}
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              value={student.password}
              onChange={(e) => setStudent({ ...student, password: e.target.value })}
              required
              type="password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="+1 (555) 555-5555"
              value={student.phone}
              onChange={(e) => setStudent({ ...student, phone: e.target.value })}
              required
              type="tel"
            />
          </div>
          <Button className="w-full" type="submit" disabled={loading} onClick={addNewStudent}>
            Add
          </Button>
        </form>
      </div>
    </Layout>
  );
}
