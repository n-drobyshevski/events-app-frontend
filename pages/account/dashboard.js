import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  if (status === "loading") {
    return;
    <Layout>
      <p>Loading or not authenticated...</p>
    </Layout>;
  } else if (status == "authenticated") {
    return (
      <Layout title="User dashboard">
        <h1>Dashboard</h1>
        <div>
          <p>user email: {session.user.email}</p>
        </div>
      </Layout>
    );
  }
}
