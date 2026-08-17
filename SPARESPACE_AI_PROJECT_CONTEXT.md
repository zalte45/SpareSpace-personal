# SpareSpace — AI Project Context & Progress Tracker

> **Purpose:** This file is the persistent context and progress-tracking document for AI coding agents working on the SpareSpace project.
>
> **Rule:** Every AI agent working on SpareSpace must read this file before making changes and must update it after every meaningful change.

---

# 1. PROJECT OVERVIEW

## Project Name

**SpareSpace**

## Project Type

Full-stack MERN marketplace for renting and listing unused storage spaces.

## Core Idea

SpareSpace connects:

- **Hosts** who have unused storage space.
- **Renters** who need storage space.

The platform allows hosts to list storage spaces and renters to discover, compare, book, pay for, manage, and review those spaces.

The application has two major user experiences:

```text
                         SPARESPACE
                             |
                +------------+------------+
                |                         |
              HOST                     RENTER
                |                         |
          Create Listing             Browse Spaces
          Manage Spaces              Search / Filter
          MySpace                    View Space
          Manage Bookings            Favorites
          Host Dashboard             Booking
                |                    Payment
                |                    Messages
                |                    Reviews
                +----------+----------+
                           |
                         ADMIN
                  (future/expansion)
```

---

# 2. CURRENT PROJECT STATUS

## Overall Status

**Stage: Full-stack application under active development**

The **Host Side already exists** and must NOT be rebuilt.

The current major task is to add the **complete Renter Side** into the same existing project.

## Current Priority

Build a complete renter journey:

```text
Discover
→ Search
→ Filter
→ View Space
→ Favorite
→ Book
→ Pay
→ Manage Booking
→ Message Host
→ Complete Rental
→ Review
```

## Critical Rule

The renter side must use the **same existing users, listings, authentication, MongoDB database, backend, and Cloudinary listing images** wherever applicable.

Do not create a parallel application or duplicate systems.

---

# 3. EXISTING TECHNOLOGY STACK

## Frontend

- React
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- GSAP / animation libraries where already used
- Existing reusable UI components

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- Cookie-based authentication
- Access token
- Refresh token
- CORS
- Cookie Parser
- Morgan
- Express Rate Limit
- Multer
- Cloudinary
- Resend for email functionality

## Development

- VS Code
- Node.js
- npm
- Nodemon
- Postman for API testing

---

# 4. EXISTING AUTHENTICATION ARCHITECTURE

The project already contains authentication.

Existing concepts include:

- User registration
- Login
- Email OTP verification
- Access token
- Refresh token
- Cookie-based token handling
- `credentials: "include"` on frontend requests
- Protected backend routes
- Token refresh/rotation architecture
- Password reset flow

## Important

Do NOT create another authentication system for renters.

A renter should use the existing authenticated user system.

A user may eventually be able to act as both:

```text
User
├── Renter
└── Host
```

The existing Host functionality must continue working.

---

# 5. EXISTING HOST SIDE

## Status

**Already created.**

The Host Side includes functionality around:

- Host interface
- List Space
- Multi-step listing form
- Redux form state
- Image selection
- Cloudinary image upload
- Listing creation
- MySpace
- Host dashboard / management functionality

## Existing Important Components

Known existing frontend areas include:

```text
src/components/HostInterface/ListSpace.jsx
src/redux/features/Form/formSlice.js
```

Exact project structure must always be inspected before modifying files.

## Host Listing Flow

```text
Host
 ↓
List Space
 ↓
Multi-step Form
 ↓
Redux Form State
 ↓
FormData
 ↓
POST Listing API
 ↓
Backend
 ↓
Authentication
 ↓
Cloudinary Image Upload
 ↓
MongoDB Listing
 ↓
MySpace
```

## Important Host-Side Rules

Do not:

- Rebuild Host Side
- Replace ListSpace unnecessarily
- Break MySpace
- Replace Cloudinary implementation unnecessarily
- Change authentication without understanding dependencies
- Remove existing listing fields
- Create duplicate listing systems

Any shared modification must be backward compatible.

---

# 6. EXISTING LISTING SYSTEM

Listings are created by hosts and stored in MongoDB.

The existing backend listing controller uses the authenticated user and listing information.

Known listing concepts include:

- owner
- title
- description
- category
- location
- availability
- rental
- images

Existing image objects use Cloudinary information such as:

```text
url
public_id
```

The renter side MUST consume these existing listings.

## Desired Data Flow

```text
HOST CREATES LISTING
        ↓
MongoDB
        ↓
RENTER BROWSE API
        ↓
Listing Cards
        ↓
Space Details
        ↓
Booking
```

There should NOT be:

```text
Host Listings
+
Separate Renter Listings
```

There should be one shared listing system.

---

# 7. EXISTING LISTING DATA

Known listing structure includes concepts such as:

```text
images[]
title
description
category

location
├── street
├── city
├── state
└── pincode

availability
├── availableImmediately
├── availableFrom
└── availableUntil

rental
├── minDuration
├── maxDuration
├── price
├── securityDeposit
└── lateFee

bookingPrefs
spaceDetails
amenities
rules
policies
```

The exact current schema must be checked in the code before implementation.

Do not assume this document is a replacement for the actual source code.

---

# 8. CLOUDINARY

The project already uses Cloudinary for listing images.

Known backend approach:

- Multer memory storage
- Image validation
- Cloudinary upload stream
- Store Cloudinary secure URL
- Store public ID

Allowed image formats have included:

- PNG
- JPEG
- JPG
- WebP

Renter listing pages should display the existing Cloudinary images.

Do not duplicate image storage.

---

# 9. EXISTING FRONTEND LISTING FORM

The Host listing form is multi-step.

Known concepts include:

- Images
- Title
- Description
- Category
- Location
- Availability
- Rental
- Policies
- Booking preferences
- Space details
- Rules
- Amenities

Redux is used to persist form data across steps.

Previously encountered Redux warning:

```text
A non-serializable value was detected in an action
```

because File objects were stored in Redux.

Any future work must avoid introducing additional non-serializable Redux state unless there is a deliberate and justified architecture for it.

---

# 10. RENTER SIDE — TARGET ARCHITECTURE

The renter side should contain:

```text
Renter
│
├── Dashboard
│
├── Browse Spaces
│   ├── Search
│   ├── Filters
│   ├── Sorting
│   ├── Pagination
│   └── Map
│
├── Space Details
│
├── Favorites
│
├── Bookings
│   ├── Upcoming
│   ├── Active
│   ├── Completed
│   └── Cancelled
│
├── Checkout
│
├── Payments
│
├── Messages
│
├── Notifications
│
├── Reviews
│
├── Profile
│
└── Help / Support
```

---

# 11. RENTER NAVIGATION

Target renter navigation:

```text
SpareSpace

Browse Spaces
Become a Host
Messages
Favorites
Profile

Sign In / User State
Get Started
```

Important:

**Become a Host must continue to connect to the existing Host Side.**

---

# 12. RENTER ROUTES

Target routes:

```text
/renter/dashboard

/spaces
/spaces/:listingId

/favorites

/bookings
/bookings/:bookingId

/checkout/:bookingId

/payments

/messages
/messages/:conversationId

/notifications

/profile

/reviews

/help
```

Use existing router conventions.

Do not blindly create duplicate routes.

---

# 13. BROWSE SPACES

The supplied UI reference represents the renter Browse Spaces page.

Target features:

### Search

- City
- Area
- Pincode
- Location

### Filters

- Price range
- Storage type
- Size
- Rating
- Amenities
- Availability
- Distance

### Storage Types

- Garage
- Spare Room
- Basement
- Shed
- Attic
- Parking

### Size

- S
- M
- L
- XL

### Amenities

- CCTV
- Climate Control
- 24/7 Access
- Parking
- Security
- Electricity
- Other listing-defined amenities

### Sorting

- Recommended
- Price Low → High
- Price High → Low
- Rating
- Distance
- Newest

### Listing Card

Should display:

- Image
- Favorite
- Storage type
- Title
- Host
- Location
- Distance
- Size
- Rating
- Review count
- Monthly price
- View Space

Use real backend listing data.

No permanent mock data.

---

# 14. SPACE DETAILS

Target route:

```text
/spaces/:listingId
```

Should contain:

## Gallery

- Main image
- Thumbnails
- Lightbox / preview

## Information

- Title
- Category
- Location
- Rating
- Reviews
- Description
- Area
- Capacity
- Access hours
- Availability
- Amenities
- Rules
- Policies

## Host

- Host information
- Rating
- Message Host

## Reviews

Display renter reviews.

## Booking Card

Show:

```text
Monthly Rent
Start Date
End Date
Duration
Security Deposit
Platform Fee
Total
Book Now
```

---

# 15. FAVORITES

Target:

```text
/favorites
```

Renter should be able to:

- Add listing
- Remove listing
- View saved listings

Favorites should be persisted in the backend.

Do not rely only on localStorage.

---

# 16. BOOKING SYSTEM

Target flow:

```text
Space Details
 ↓
Book Now
 ↓
Select Start Date
 ↓
Select End Date / Duration
 ↓
Availability Validation
 ↓
Price Calculation
 ↓
Review Booking
 ↓
Checkout
 ↓
Payment
 ↓
Booking Confirmation
```

Potential Booking model:

```text
Booking
├── renter
├── listing
├── host
├── startDate
├── endDate
├── duration
├── monthlyPrice
├── securityDeposit
├── platformFee
├── totalAmount
├── bookingStatus
├── paymentStatus
├── createdAt
└── updatedAt
```

Exact model should follow project conventions.

---

# 17. BOOKING VALIDATION

Backend must validate:

- Listing exists
- Listing is available
- Dates are valid
- Duration is valid
- Booking does not overlap another booking
- User is authenticated
- User has permission
- Price is calculated server-side

Never rely only on frontend validation.

---

# 18. BOOKING STATUS

Suggested statuses:

```text
Pending
Confirmed
Active
Completed
Cancelled
Expired
```

Payment status:

```text
Pending
Successful
Failed
Refunded
```

Use enums/constants where appropriate.

---

# 19. MY BOOKINGS

Target:

```text
/bookings
```

Sections:

- Upcoming
- Active
- Completed
- Cancelled

Each booking should show:

- Listing
- Location
- Rental period
- Amount
- Status
- Payment status
- View Booking

---

# 20. BOOKING DETAILS

Target:

```text
/bookings/:bookingId
```

Show:

- Booking ID
- Listing
- Host
- Dates
- Duration
- Monthly price
- Security deposit
- Platform fee
- Total
- Payment status
- Booking status

Actions:

- Message Host
- Cancel Booking
- View Receipt
- Leave Review

Actions must be controlled by backend rules.

---

# 21. PAYMENT SYSTEM

Target architecture:

```text
Booking
 ↓
Create Payment Order
 ↓
Payment Gateway
 ↓
Frontend Payment
 ↓
Backend Verification
 ↓
Payment Successful
 ↓
Booking Confirmed
```

Potential provider:

**Razorpay**

If credentials are not configured:

- Build architecture
- Use development-safe flow where appropriate
- Clearly document missing configuration

Never fake production payment success.

Never trust frontend payment success.

---

# 22. TRANSACTIONS

Target:

```text
/payments
```

Display:

- Transaction ID
- Booking
- Amount
- Date
- Payment status
- Refund status

---

# 23. MESSAGING

Target:

```text
/messages
/messages/:conversationId
```

Renter ↔ Host messaging.

Conversation should support:

- Participants
- Listing/booking context
- Messages
- Timestamp
- Read/unread state

Initial implementation can use REST APIs.

WebSockets can be introduced later.

---

# 24. NOTIFICATIONS

Target:

```text
/notifications
```

Notification events:

- Booking confirmed
- Payment successful
- Payment failed
- Booking cancelled
- Booking starting
- Booking ending
- Host message
- Review request
- Refund

Support read/unread state.

---

# 25. RENTER PROFILE

Target:

```text
/profile
```

Sections:

### Personal

- Name
- Email
- Phone
- Profile image

### Security

- Change password
- Logout
- Existing authentication/session handling

### Preferences

- Storage type
- Location
- Price
- Notifications

Reuse existing profile/authentication functionality.

---

# 26. REVIEWS

Renter can review a listing/host after completing a booking.

Review:

```text
rating
comment
booking
listing
renter
createdAt
```

Rules:

- Only authenticated renter
- Must own booking
- Booking must be completed
- Prevent unauthorized reviews
- Prevent inappropriate duplicates

---

# 27. REPORTS

Allow renters to report listings.

Reasons:

- Fake listing
- Incorrect information
- Unsafe
- Fraud/scam
- Inappropriate
- Other

Store reports for future Admin functionality.

---

# 28. RENTER DASHBOARD

Target:

```text
/renter/dashboard
```

Show:

- Upcoming bookings
- Active rentals
- Favorites
- Completed rentals
- Upcoming booking
- Recently viewed
- Recommended spaces

Use real data.

---

# 29. MAP VIEW

Browse Spaces should support:

```text
List View
Map View
```

Map can be implemented after the core renter functionality.

Do not allow map work to block:

- Search
- Listing
- Booking

---

# 30. HELP / SUPPORT

Target:

```text
/help
```

Sections:

- How SpareSpace works
- Booking
- Payment
- Cancellation
- Refund
- Account
- Safety
- FAQ
- Support

---

# 31. DATABASE TARGET

Existing models must be inspected first.

Potential additional models:

```text
Booking
Favorite
Payment
Review
Conversation
Message
Notification
Report
```

Do not create a model if equivalent functionality already exists.

---

# 32. API TARGET

Potential APIs:

```text
Listing
GET /api/listing
GET /api/listing/:id

Favorite
POST /api/favorite
DELETE /api/favorite/:id
GET /api/favorite

Booking
POST /api/booking
GET /api/booking
GET /api/booking/:id
PATCH /api/booking/:id
DELETE /api/booking/:id

Payment
POST /api/payment/order
POST /api/payment/verify
GET /api/payment

Review
POST /api/review
GET /api/review/:listingId

Message
POST /api/message
GET /api/message
GET /api/message/:conversationId

Notification
GET /api/notification
PATCH /api/notification/:id

Report
POST /api/report
```

These are targets, not commands to blindly create duplicate APIs.

---

# 33. REDUX TARGET

Inspect existing Redux first.

Possible renter slices:

```text
listingSlice
favoriteSlice
bookingSlice
paymentSlice
messageSlice
notificationSlice
```

Avoid:

- Giant renter slice
- Duplicate auth state
- Non-serializable state
- Storing unnecessary server data

Follow the existing project architecture.

---

# 34. UI/UX REQUIREMENTS

Renter side must visually belong to SpareSpace.

Use the existing:

- Tailwind configuration
- Components
- Typography
- Buttons
- Cards
- Colors
- Animations
- Layout patterns

The Browse Spaces screenshot is the primary visual reference for the renter marketplace.

The Host Side should continue looking consistent.

---

# 35. RESPONSIVENESS

Support:

- Desktop
- Laptop
- Tablet
- Mobile

Mobile behavior:

- Filter drawer
- Collapsed navigation
- Responsive cards
- Responsive gallery
- Responsive booking section
- Responsive tables

---

# 36. LOADING / ERROR / EMPTY STATES

Every API-driven screen must handle:

### Loading

Skeleton/loading state.

### Empty

Examples:

```text
No favorite spaces yet.
Browse Spaces
```

```text
No bookings yet.
Find a Space
```

### Error

User-friendly error message.

Never leave blank screens.

---

# 37. SECURITY REQUIREMENTS

Backend authorization is mandatory.

Protect:

- Bookings
- Payments
- Favorites
- Reviews
- Messages
- Notifications
- Reports

A renter must never access another renter's private data by changing an ID.

Validate:

- ObjectIds
- Authentication
- Authorization
- Prices
- Dates
- Booking ownership
- Payment ownership

---

# 38. PERFORMANCE

Use:

- Pagination
- Debounced search
- Lazy images
- Optimized Cloudinary images
- Efficient database queries
- Appropriate indexes
- Avoid duplicate requests

Do not over-engineer.

---

# 39. DEVELOPMENT RULE

Before implementing anything:

```text
1. Inspect
2. Understand
3. Plan
4. Implement
5. Test
6. Update this file
```

Never modify major architecture blindly.

---

# 40. AI AGENT PROGRESS TRACKER

## 🚨 MANDATORY RULE

**Every AI coding agent must update this section after every meaningful change.**

This file is the persistent memory/context for AI agents.

Before starting work:

1. Read the entire file.
2. Read the current project source.
3. Check the latest Progress Log.
4. Continue from the current state.
5. Do not repeat already completed work.

After making changes:

1. Update the relevant status.
2. Add a new Progress Log entry.
3. Record files created.
4. Record files modified.
5. Record APIs/models added or changed.
6. Record tests performed.
7. Record remaining issues.
8. Record the next recommended task.

---

# 41. CURRENT FEATURE STATUS

Use:

- `[ ]` Not Started
- `[~]` In Progress
- `[x]` Completed
- `[!]` Blocked
- `[-]` Deferred

## Existing Core

- [x] Existing Host Side
- [x] Host List Space flow
- [x] Existing Listing creation
- [x] Cloudinary image upload
- [x] Existing authentication foundation
- [x] MongoDB/Mongoose foundation
- [x] Existing MySpace functionality

## Renter Foundation

- [ ] Renter navigation
- [ ] Renter routes
- [ ] Renter dashboard
- [ ] Browse Spaces
- [ ] Listing API integration
- [ ] Search
- [ ] Filters
- [ ] Sorting
- [ ] Pagination
- [ ] Space Details
- [ ] Responsive renter UI

## Renter Interaction

- [ ] Favorites
- [ ] Recently Viewed
- [ ] Profile integration

## Booking

- [ ] Booking model
- [ ] Booking API
- [ ] Availability validation
- [ ] Date selection
- [ ] Duration
- [ ] Price calculation
- [ ] My Bookings
- [ ] Booking Details
- [ ] Cancellation

## Payments

- [ ] Checkout
- [ ] Payment order
- [ ] Payment integration
- [ ] Backend payment verification
- [ ] Transactions
- [ ] Receipt
- [ ] Refund handling

## Communication

- [ ] Messages
- [ ] Conversations
- [ ] Notifications

## Trust

- [ ] Reviews
- [ ] Ratings
- [ ] Report Listing

## Additional

- [ ] Map View
- [ ] Recommendations
- [ ] Help / Support

## Future Admin

- [ ] Admin Dashboard
- [ ] User Management
- [ ] Listing Management
- [ ] Booking Management
- [ ] Payment Management
- [ ] Report Management

---

# 42. PROGRESS LOG

## Entry Template

Every meaningful change MUST create a new entry using this format:

```text
## YYYY-MM-DD — [Short Change Title]

### AI Agent
[Agent/tool name if known]

### Objective
[What was being implemented]

### Status
[x] Completed
[~] In Progress
[!] Blocked

### Changes Made

#### Frontend
- 

#### Backend
- 

#### Database
- 

#### Redux / State
- 

#### Authentication / Security
- 

### Files Created
- 

### Files Modified
- 

### APIs Added / Modified
- 

### Models Added / Modified
- 

### Testing Performed
- 

### Problems Found
- 

### Problems Fixed
- 

### Remaining Issues
- 

### Next Recommended Task
- 

### Notes for Next AI Agent
- 
```

---

# 43. INITIAL PROJECT BASELINE

## Baseline — Before Renter Implementation

### Existing

- Host Side exists.
- Host listing creation exists.
- Multi-step List Space form exists.
- Redux form state exists.
- Cloudinary image upload exists.
- MongoDB/Mongoose exists.
- Authentication exists.
- Access/refresh token architecture exists.
- MySpace exists.

### New Work

The renter marketplace is now being added.

### Current Renter Status

**Not yet fully implemented.**

The first implementation target is:

```text
Renter Navigation
→ Browse Spaces
→ Existing Listing API Integration
→ Search / Filters
→ Space Details
```

### Important

Do not assume features are completed simply because they appear in this planning document.

The source code and the Progress Log are the final indicators of actual implementation status.

---

# 44. CHANGE TRACKING RULES

AI agents must:

### Rule 1 — Never silently modify

If a meaningful architectural change is made, document it.

### Rule 2 — Never claim completion without testing

A feature is `[x] Completed` only after reasonable testing.

### Rule 3 — Record failures

If an implementation failed or was reverted, document it.

### Rule 4 — Record decisions

If an architectural decision is made, document why.

### Rule 5 — Preserve Host Side

Any change affecting shared files must mention whether Host Side regression testing was performed.

### Rule 6 — Update after every meaningful change

Do not wait until the entire project is complete.

### Rule 7 — Keep this document current

If project architecture changes, update the Project Overview and relevant sections.

---

# 45. ARCHITECTURAL DECISION LOG

Record important decisions here.

## Decision Template

```text
## [Date] — [Decision]

### Decision
[What was decided]

### Reason
[Why]

### Alternatives Considered
-

### Impact
-

### AI Agent
-
```

Current decisions:

### 2026-08-17 — Renter Side Added as Extension

**Decision:** Build renter functionality inside the existing SpareSpace project.

**Reason:** Host Side is already implemented and renter functionality must share the same platform.

**Impact:** Existing Host Side, authentication, listing system, database, and Cloudinary implementation should be reused.

---

# 46. KNOWN HISTORICAL ISSUES

These are historical issues encountered during development. They should not be assumed to still exist.

Previously encountered examples include:

- MongoDB connection port/configuration issues
- MongoDB Atlas DNS issues
- Environment variable configuration problems
- CORS configuration
- JWT missing from requests
- Refresh/access token handling
- FormData handling
- Multer/Cloudinary upload issues
- Redux non-serializable File warnings
- API request/response debugging
- Password reset token mismatch
- Listing API 500 errors
- Booking/authentication integration work still evolving

Before fixing an issue, verify whether it still exists in the current source code.

---

# 47. FINAL AI AGENT CHECKLIST

Before finishing a task:

- [ ] Read this file
- [ ] Inspect existing source
- [ ] Reuse existing architecture
- [ ] Avoid duplicate systems
- [ ] Preserve Host Side
- [ ] Implement real backend integration
- [ ] Validate authentication
- [ ] Validate authorization
- [ ] Test frontend
- [ ] Test backend
- [ ] Check console errors
- [ ] Update feature status
- [ ] Add Progress Log entry
- [ ] Document files changed
- [ ] Document APIs/models changed
- [ ] Document remaining issues
- [ ] Document next task

---

# 48. DEFINITION OF DONE

SpareSpace Renter Side is considered complete only when a renter can realistically:

```text
Create/Login Account
        ↓
Browse Host-created Spaces
        ↓
Search / Filter
        ↓
Open Space Details
        ↓
Favorite Space
        ↓
Select Rental Dates
        ↓
Book Available Space
        ↓
Pay
        ↓
Receive Confirmation
        ↓
View Booking
        ↓
Message Host
        ↓
Manage Rental
        ↓
Complete Rental
        ↓
Leave Review
```

And all of this works without breaking the existing Host Side.

---

# END OF PROJECT CONTEXT

**This document must remain in the project repository and be treated as persistent AI project memory.**
