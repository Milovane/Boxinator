export const pagesAndLinks = [
  { Name: "Home", Link: "/", Authenticated: false, Admin: false },
  {
    Name: "Create shipment",
    Link: "/create-shipment",
    Authenticated: false,
    Admin: false,
  },
  {
    Name: "Shipment",
    Link: "/shipment",
    Authenticated: true,
    Admin: false,
  },
  {
    Name: "Profile",
    Link: "/profile",
    Authenticated: true,
    Admin: false,
  },
  {
    Name: "Admin",
    Link: "/admin",
    Authenticated: true,
    Admin: true,
  },
];
