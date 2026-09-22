```mermaid
classDiagram
%% Rough draft: sufficient to convey the concept; refine during review
    class User {
    %% unique id, primary key
        +String userId
    %% just for display in the app
        +String name
    %% used to log in
        +String email
    %% never store plaintext, obviously
        +String passwordHash
    %% driving licence number (kørekortnummer): proves they are allowed to drive
        +String licenceNumber
    %% has this user been approved for cross-border trips
        +Boolean crossBorderPermit
        +createAccount()
    }

    class Car {
    %% unique id, primary key
        +String carId
    %% like Toyota
        +String brand
    %% like Corolla
        +String model
    %% car size category (small, medium, large, premium), see enum below
        +CarSize size
    %% manual or automatic gear, see enum below
        +GearType gearType
    %% petrol, diesel, electric, hybrid, see enum below
        +FuelType fuelType
    %% how many people fit
        +Int seats
    %% how much luggage fits, in litres
        +Int luggageSpace
    %% km per litre (or km per charge for electric) for the eco filter
        +Decimal fuelEfficiency
    %% is this car allowed to cross borders
        +Boolean crossBorderOk
    %% does this car meet environmental or low-emission zone rules
        +Boolean environmentZoneCompliant
    %% rental cost per day
        +Decimal pricePerDay
    %% is it free right now (used for filtering, US-4)
        +Boolean available
        +checkAvailability(dateRange) Boolean
    }

    class Feature {
    %% like wireless charging, sunroof, heated seats
    %% unique id, primary key
        +String featureId
    %% what the feature is called
        +String name
    }

    class AddOn {
    %% like child seat, GPS, extra driver
    %% unique id, primary key
        +String addOnId
    %% what the add-on is called
        +String name
    %% extra cost for this add-on
        +Decimal price
    }

    class Booking {
    %% unique id, primary key
        +String bookingId
    %% who booked it: links to User
        +String userId
    %% which car was booked: links to Car
        +String carId
    %% pickup date
        +DateTime startDate
    %% return date
        +DateTime endDate
    %% car price + any add-ons, calculated
        +Decimal totalPrice
    %% active, cancelled, or completed, see enum below
        +BookingStatus status
    %% when the booking was made
        +DateTime createdAt
        +cancelBooking()
        +calculateTotalPrice()
    }

    class BookingAddOn {
    %% join table: allows a booking to have multiple add-ons with quantity
    %% unique id, primary key
        +String bookingAddOnId
    %% which booking this belongs to
        +String bookingId
    %% which add-on was picked
        +String addOnId
    %% like 2 child seats
        +Int quantity
    }

    class CarSize {
        <<enumeration>>
    %% cheapest, smallest option; for example, Toyota Aygo
        SMALL
    %% standard mid-range car; for example, VW Golf
        MEDIUM
    %% big car with extra ground clearance or space; for example, Volvo XC60
        LARGE
    %% premium or high-end car; for example, Mercedes E-Class
        PREMIUM
    }

    class GearType {
        <<enumeration>>
    %% driver shifts gears
        MANUAL
    %% car shifts gears itself
        AUTOMATIC
    }

    class FuelType {
        <<enumeration>>
    %% runs on petrol
        PETROL
    %% runs on diesel
        DIESEL
    %% petrol or diesel and electric combined
        HYBRID
    %% fully electric
        ELECTRIC
    }

    class BookingStatus {
        <<enumeration>>
    %% booking is upcoming or ongoing
        ACTIVE
    %% user cancelled it
        CANCELLED
    %% rental period is over
        COMPLETED
    }

    User "1" --> "0..*" Booking: places
    Car "1" --> "0..*" Booking: reserved in
    Booking "1" --> "0..*" BookingAddOn: includes
    AddOn "1" --> "0..*" BookingAddOn: selected as
    Car "0..*" --> "0..*" Feature: has
    Car ..> CarSize: has
    Car ..> GearType: has
    Car ..> FuelType: has
    Booking ..> BookingStatus: has
```

Car and AddOn represent reference data and read operations. Cache locally after fetching to cover offline browsing and filtering (US-1, US-2, US-4) per NFR-K1.

Booking and BookingAddOn represent write operations. Save locally as soon as actions occur (booking or cancelling) so US-3, US-5, and US-7 work offline as well. Add a `syncStatus` field (`pending`, `synced`, or `failed`) to track state.

User data is also cached locally for the active session, but account creation (US-6) is not complete until confirmed by the backend.

All local writes are processed through a background synchronisation queue with retry and backoff. This satisfies NFR-K2: offline booking does not lose data, but delays synchronisation.