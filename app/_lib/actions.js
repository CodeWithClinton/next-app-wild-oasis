"use server";

import { revalidatePath } from "next/cache";
import {
  deleteBooking,
  getBookings,
  updateGuest as supabaseUpdateGuest,
  updateBooking,
  createBooking as supabaseCreateBooking
} from "./data-service";
import { redirect } from "next/navigation";

const { signIn, signOut, auth } = require("./auth");

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationalID, nationality, countryFlag };

  supabaseUpdateGuest(guestID, updateData);

  revalidatePath("account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  const guestID = session?.user?.guestId;
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  deleteBooking(bookingId);
  revalidatePath("account/reservations");
}

export async function updateReservation(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  const bookingId = Number(formData.get("bookingId"));
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000);
  console.log("yeppppppppppp");
  console.log(session.user.guestId);
  console.log(bookingId);
  console.log(typeof session.user.guestId);
  console.log(typeof bookingId);
  console.log(guestBookingIds);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  const updateData = { numGuests, observations };

  updateBooking(bookingId, updateData);
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  const guestID = session?.user?.guestId;
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    ispaid: false,
    hssBreakfast: false,
    status: "unconfirmed"
  };

  console.log(newBooking)
  supabaseCreateBooking(newBooking)

  revalidatePath(`/cabins/${bookingData.cabinId}`)
  
}
