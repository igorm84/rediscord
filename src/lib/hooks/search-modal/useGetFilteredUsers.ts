import getUsersGeneral from "@/app/(actions)/general/getUsers";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

export default function useGetFilteredUsers({ filter }: { filter: string }) {
  const query = useQuery({
    queryKey: ["users-general", filter],
    queryFn: () => {
      return new Promise((r) =>
        setTimeout(
          () =>
            r(
              getUsersGeneral({
                where: {
                  username: {
                    startsWith: filter,
                  },
                },
              }),
            ),
          1000,
        ),
      );
    },
    placeholderData: keepPreviousData,
  });
  return query;
}
