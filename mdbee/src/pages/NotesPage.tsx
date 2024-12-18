import {
  QueryClientProvider,
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { modals } from '@mantine/modals';
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import { useMemo, useState } from "react";
// import packageService from "../services/package.service";
import { Box, Button, Divider, Flex, LoadingOverlay, Text } from "@mantine/core";
import { Note } from "../Interfaces";

// const usePackages = () => {
//   return useQuery({
//     queryKey: ["id"],
//     queryFn: async () => {
//       const { data } = await packageService.getPackages();
//       console.log(data);
//       return data["data"];
//     },
//     placeholderData: keepPreviousData, //useful for paginated queries by keeping data from previous pages on screen while fetching the next page
//     // staleTime: 30_000, //don't refetch previously viewed pages until cache is more than 30 seconds old
//   });
// };

const NotesPage = () => {
 

  return (
    <></>
    // <QueryClientProvider client={queryClient}>
    //   {/* <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
    //   <MantineReactTable
    //     columns={columns}
    //     data={data ? data : []}
    //     enableExpandAll={false}
    //     // #E9ECEF
    //     mantineDetailPanelProps={{bg:"#F1F3F5"}}
    //     renderDetailPanel={({ row }) => (
    //       <Box>
    //         <Box
    //           style={{
    //             display: "grid",
    //             margin: "auto",
    //             gridTemplateColumns: "1fr 1fr 1fr",
    //             width: "100%",
    //           }}
    //         >
    //           <Text>Length: {row.original.length} inch</Text>
    //           <Text>Width: {row.original.width} inch</Text>
    //           <Text>Height: {row.original.height} inch</Text>
    //           <Text>Weight: {row.original.weight} lbs</Text>
    //           <Text>Billing Weight: {row.original.billingWeight} lbs</Text>
    //           <Text>Price: ${row.original.totalPrice}</Text>
    //           <Text>Declared Value: ${row.original.declaredValue}</Text>
    //         </Box>
    //         <Flex
    //           align={"center"}
    //           justify={"center"}
    //           gap={5}
    //           mt={10}
    //         >
    //           <Button
    //             onClick={() => printBase64PDF(row.original.label)}
    //             style={{}}
    //             bg={"#FF0000"}
    //             disabled={row.original.status === "canceled"}
    //           >
    //             Print label
    //           </Button>
    //           <Button
    //             onClick={() => openCancelModal(row.original.id as string)}
    //             style={{}}
    //             bg={"#FF0000"}
    //             disabled={row.original.status !== "new"}
    //             loading={isCanceling}
    //             loaderProps={{ type: 'dots' }}
    //           >
    //             Cancel package
    //           </Button>
    //           <Button
    //             style={{}}
    //             bg={"#FF0000"}
    //             disabled={row.original.status === "canceled"}
    //             onClick={() => window.open(`https://www.fedex.com/wtrk/track/?action=track&tracknumbers=${row.original.number}&locale=en_US&cntry_code=us`, "_blank")}
    //           >
    //             Track package
    //           </Button>
    //         </Flex>
    //         <Divider
    //           my="md"
    //           labelPosition="center"
    //           label={<Text>Sender</Text>}
    //         />
    //         <Box
    //           style={{
    //             display: "grid",
    //             margin: "auto",
    //             gridTemplateColumns: "1fr 1fr 1fr",
    //             width: "100%",
    //           }}
    //         >
    //           <Text>First name: {row.original.senderFirstName}</Text>
    //           <Text>Last name: {row.original.senderLastName}</Text>
    //           <Text />
    //           <Text>Address: {row.original.senderAddressLine1}</Text>
    //           <Text>
    //             Address (second line): {row.original.senderAddressLine2}
    //           </Text>
    //           <Text>ZIP code: {row.original.senderPostcode}</Text>
    //           <Text>City: {row.original.senderCity}</Text>
    //           <Text>State: {row.original.senderState}</Text>
    //           <Text>Country: {row.original.senderCountry}</Text>
    //           <Text>Phone Number: {row.original.senderPhoneNumber}</Text>
    //           <Text>Email: {row.original.senderEmail}</Text>
    //         </Box>
    //         <Divider
    //           my="md"
    //           labelPosition="center"
    //           label={<Text>Recipient</Text>}
    //         />
    //         <Box
    //           style={{
    //             display: "grid",
    //             margin: "auto",
    //             gridTemplateColumns: "1fr 1fr 1fr",
    //             width: "100%",
    //           }}
    //         >
    //           <Text>First name: {row.original.recipientFirstName}</Text>
    //           <Text>Last name: {row.original.recipientLastName}</Text>
    //           <Text />
    //           <Text>Address: {row.original.recipientAddressLine1}</Text>
    //           <Text>
    //             Address (second line): {row.original.recipientAddressLine2}
    //           </Text>
    //           <Text>ZIP code: {row.original.recipientPostcode}</Text>
    //           <Text>City: {row.original.recipientCity}</Text>
    //           <Text>State: {row.original.recipientState}</Text>
    //           <Text>Country: {row.original.recipientCountry}</Text>
    //           <Text>Phone Number: {row.original.recipientPhoneNumber}</Text>
    //           <Text>Email: {row.original.recipientEmail}</Text>
    //         </Box>
    //       </Box>
    //     )}
        
    //     positionGlobalFilter="right"

    //   /> */}
    // </QueryClientProvider>
  );
};

export default NotesPage;
