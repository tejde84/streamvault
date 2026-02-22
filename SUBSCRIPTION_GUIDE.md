# StreamVault - Subscription Features Guide

## 🎯 New Features Overview

StreamVault now includes a Netflix-style subscription system with three tier plans:

### **Subscription Tiers**

#### 1. **Basic Plan** - $6.99/month
- Watch on 1 device at a time
- Standard Definition (SD) quality
- Ads included
- 30-day free trial

#### 2. **Standard Plan** - $15.49/month (MOST POPULAR)
- Watch on 2 devices simultaneously
- Full HD (1080p) quality
- Ad-free experience
- Download content to watch offline
- 30-day free trial

#### 3. **Premium Plan** - $22.99/month
- Watch on 4 devices simultaneously
- 4K Ultra HD quality
- Ad-free experience
- Download content to watch offline
- Create up to 6 user profiles
- Spatial Audio support
- 30-day free trial

---

## 🚀 User Flow

### **Landing Page** (When Not Logged In)
1. User visits `http://localhost:3001`
2. Sees Netflix-style landing page with:
   - Hero banner
   - Three subscription plan cards
   - Features comparison
   - FAQ section
   - Footer

### **Sign Up Flow**
1. User clicks "Start Free Trial" on any plan
2. Routed to `/signup?plan=<plan_name>`
3. Plan is pre-selected in signup form
4. User fills in details:
   - Username
   - Email
   - Password
   - Confirm Password
5. Selected plan is shown (can be changed)
6. Account created with subscription tier
7. 30-day free trial starts automatically
8. Redirected to home page with movies

### **Login Flow**
1. User enters email and password
2. Logged in with their existing subscription tier
3. Subscription plan badge shows in navbar
4. Access to movies based on their plan

### **Movies Page** (When Logged In)
- Shows full movie catalog
- Search, filter, and sort functionality
- Movie details and information
- Subscription plan badge displayed in navbar

---

## 🔧 Backend Implementation

### **Models Updated**

#### **User Model** - Enhanced with subscription info
```javascript
{
  username: String,
  email: String,
  password: String,
  subscription: mongoose.Schema.Types.ObjectId, // Reference to Subscription
  subscriptionPlan: String, // 'basic', 'standard', 'premium', 'free'
  createdAt: Date
}
```

#### **Subscription Model** - New model for tracking subscriptions
```javascript
{
  userId: mongoose.Schema.Types.ObjectId,
  plan: String, // 'basic', 'standard', 'premium'
  price: Number,
  status: String, // 'active', 'cancelled', 'expired'
  startDate: Date,
  renewalDate: Date,
  features: {
    maxDevices: Number,
    videoQuality: String,
    adFree: Boolean,
    downloads: Boolean
  },
  createdAt: Date
}
```

### **Routes Updated**

#### **Auth Signup** - Now accepts plan parameter
```
POST /api/auth/signup
Body: {
  username: String,
  email: String,
  password: String,
  plan: String ('basic' | 'standard' | 'premium')
}

Response: {
  success: true,
  token: String,
  user: {
    id: String,
    username: String,
    email: String,
    subscriptionPlan: String
  }
}
```

#### **Auth Login** - Returns subscription info
```
POST /api/auth/login
Response includes subscriptionPlan in user object
```

---

## 🎨 Frontend Components

### **LandingPage.jsx**
- Netflix-style landing page
- Subscription plan cards with visual distinction
- Features section
- FAQ section
- Call-to-action buttons
- Responsive design

### **Signup.jsx** - Enhanced
- Plan selection interface
- Visual plan comparison
- Pre-selected plan from URL param
- Plan change capability
- Free trial information

### **Login.jsx** - Enhanced
- Modern login form
- Professional styling
- Subscription info integration

### **Navbar.jsx** - Enhanced
- Shows current subscription plan
- Color-coded plan badges:
  - Basic: Blue badge
  - Standard: Purple badge
  - Premium: Red badge

---

## 📊 Plan Feature Comparison

| Feature | Basic | Standard | Premium |
|---------|-------|----------|---------|
| **Price** | $6.99/mo | $15.49/mo | $22.99/mo |
| **Devices** | 1 | 2 | 4 |
| **Quality** | SD (480p) | Full HD (1080p) | 4K (2160p) |
| **Ads** | Yes | No | No |
| **Downloads** | ❌ | ✅ | ✅ |
| **Profiles** | 1 | 2 | 6 |
| **Free Trial** | 30 days | 30 days | 30 days |

---

## 💾 Data Flow

### **Sign Up Process**
```
User selects plan → 
Fill signup form → 
API creates user with subscriptionPlan → 
JWT token generated → 
Token stored in localStorage → 
Subscription plan stored in localStorage → 
Redirected to Home page
```

### **Login Process**
```
User enters credentials → 
API validates → 
Returns token + user info with subscriptionPlan → 
Both stored in localStorage → 
Navbar displays subscription badge → 
User can access movies
```

---

## 🔐 Access Control

### **Unauthenticated Routes**
- `/` → Shows LandingPage
- `/signup` → Shows Signup with plan selection
- `/login` → Shows Login form

### **Authenticated Routes**
- `/` → Shows Home with movies catalog
- `/movie/:id` → Shows movie details
- Navbar shows subscription plan badge

### **Redirects**
- If logged in and visit `/login` or `/signup` → Redirected to Home
- If not logged in and visit movie routes → Redirected to LandingPage
- Logout clears token and subscriptionPlan from localStorage

---

## 🎯 Usage Instructions

### **For Users**

1. **Visit the site**
   ```
   http://localhost:3001
   ```

2. **Choose a plan** - Select Basic, Standard, or Premium
   - Click "Start Free Trial" button
   - Pre-selected plan shows up on signup form

3. **Create Account**
   - Enter username, email, password
   - Can change plan if desired
   - Create account button labeled "Start Free Trial"

4. **Access Movies**
   - Full movie catalog available immediately
   - Search and filter functionality
   - Subscription tier badge in navbar
   - 30-day trial countdown (in future implementation)

5. **View Movie Details**
   - Click any movie card
   - See full details, cast, ratings
   - View relevant for subscription tier

6. **Logout**
   - Click Logout button in navbar
   - Returns to LandingPage

---

## 🔮 Future Enhancements

### **Payment Integration**
- [ ] Stripe/PayPal integration for payments
- [ ] Automatic billing after free trial
- [ ] Subscription renewal logic
- [ ] Payment method management

### **Subscription Management**
- [ ] User profile/account settings
- [ ] Plan upgrade/downgrade functionality
- [ ] Billing history
- [ ] Cancel subscription
- [ ] Trial countdown timer

### **Feature Gating**
- [ ] Limit downloads by plan
- [ ] Quality restrictions by plan
- [ ] Device limit enforcement
- [ ] Ad injection for Basic plan

### **Analytics**
- [ ] Track plan popularity
- [ ] Monitor subscription churn
- [ ] User engagement by tier
- [ ] Revenue tracking

---

## 📝 Testing Checklist

- [x] Landing page displays correctly
- [x] Plan selection shows on signup
- [x] User can sign up with selected plan
- [x] Subscription plan saved in user account
- [x] Login returns subscription plan
- [x] Navbar shows subscription badge
- [x] Color coding works correctly
- [x] Different plans show different colors
- [x] Logged in users see home page
- [x] Logged out users see landing page
- [x] Movie access works for logged in users
- [x] Redirection works correctly

---

## 🚀 Deployment Notes

### **Environment Variables Needed**
```
MONGODB_URI=mongodb://localhost:27017/streamvault
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=production

# Future additions:
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_PUBLISHABLE_KEY=your_publishable_key
```

### **Database Setup**
- Subscription model automatically created on first use
- User model updated with subscription fields
- No manual migration needed (MongoDB is schema-less)

---

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Check backend logs for API errors
3. Verify MongoDB connection
4. Check that tokens are being stored in localStorage
5. Clear browser cache if experiencing issues

---

## 🎬 Current Status

✅ **Completed Features:**
- Landing page with subscription plans
- User registration with plan selection
- User login with subscription info
- Subscription plan display in navbar
- Movie access for logged-in users
- Plan color-coded badges

⏳ **In Development:**
- Payment processing
- Subscription management dashboard
- Feature gating by plan
- Trial countdown timer

---

**Last Updated:** February 22, 2026
**Version:** 1.1.0 (Subscription System Added)
