// export default function Profile() {
//   return (
//     <div>Profile

//       <Grid size={{ xs: 12, md: 4 }}>
//               <TextInput name="name.firstName" label="First Name" required />
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <TextInput name="name.middleName" label="Middle Name" />
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <TextInput name="name.lastName" label="Last Name" required />
//             </Grid>

//             <Grid size={{ xs: 12, md: 4 }}>
//               <TextInput name="email" label="Email" type="email" required />
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <TextInput name="phone" label="Phone" type="tel" required />
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <TextInput name="nid" label="NID" required />
//             </Grid>

//             <Grid size={{ xs: 12, md: 4 }}>
//               <DateInput name="dateOfBirth" label="Date of Birth" required />
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <DateInput name="dateOfJoining" label="Joining Date" required />
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <SelectInputField
//                 name="gender"
//                 label="Gender"
//                 options={["male", "female", "other"]}
//                 requiredMessage="Gender is required"
//               />
//             </Grid>

//             {/* Address Section */}
//             <Grid size={{ xs: 12, md: 12 }}>
//               <SectionHeader
//                 icon={<InfoOutlinedIcon />}
//                 title="Address Information"
//                 subtitle="Enter present and permanent address"
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 6 }}>
//               <TextInput
//                 name="address.presentAddress"
//                 label="Present Address"
//                 required
//                 multiline
//                 row={2}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, md: 6 }}>
//               <TextInput
//                 name="address.permanentAddress"
//                 label="Permanent Address"
//                 required
//                 multiline
//                 row={2}
//               />
//             </Grid>

//                   {/* Password Section - Only for new users */}
//                         {!currentData && (
//                           <>
//                             <Grid size={{ xs: 12, md: 12 }}>
//                               <SectionHeader
//                                 icon={<MdSecurity />}
//                                 title="Security"
//                                 subtitle="Create new password"
//                               />
//                             </Grid>

//                             <Grid size={{ xs: 12, md: 12 }}>
//                               <TextInput
//                                 name="password"
//                                 label="Password"
//                                 type="password"
//                                 defaultValue="12345"
//                                 placeholder="Enter password"
//                                 required
//                               />
//                             </Grid>
//                           </>
//                         )}

//             {/* Bank Information - Only for Sellers */}
//               <>
//                 <Grid size={{ xs: 12, md: 12 }}>
//                   <SectionHeader
//                     icon={<MdAccountBalance />}
//                     title="Bank Information"
//                     subtitle="Only for sellers"
//                   />
//                 </Grid>

//                 <Grid size={{ xs: 12, md: 4 }}>
//                   <SelectInputField
//                     name="bankAccountInfo.paymentMethod"
//                     label="Payment Method"
//                     options={["bankTransfer", "mobileBanking"]}
//                     requiredMessage="Payment method is required"
//                   />
//                 </Grid>
//                 <Grid size={{ xs: 12, md: 4 }}>
//                   <SelectInputField
//                     name="bankAccountInfo.bankName"
//                     label="Bank Name"
//                     options={["bKash", "Nagad", "dhakaBank"]}
//                     requiredMessage="Bank name is required"
//                   />
//                 </Grid>
//                 <Grid size={{ xs: 12, md: 4 }}>
//                   <TextInput
//                     name="bankAccountInfo.accountNumber"
//                     label="Account Number"
//                     required
//                   />
//                 </Grid>
//               </>

//               </Grid>
//     </div>
//   )
// }

export default function Profile() {
  return <div>Profile</div>;
}
