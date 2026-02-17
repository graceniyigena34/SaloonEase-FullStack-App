@echo off
echo Testing Authentication Flow...
echo.

echo 1. Testing Signup...
curl -X POST http://localhost:5001/api/auth/signup -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"phone\":\"+1234567890\",\"password\":\"password123\",\"role\":\"customer\"}"
echo.
echo.

echo 2. Check your email or response above for OTP code
echo.

set /p otp="Enter OTP code: "
echo.

echo 3. Verifying OTP...
curl -X POST http://localhost:5001/api/auth/verify-otp -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\",\"otpEntered\":\"%otp%\"}"
echo.
echo.

echo 4. Testing Login...
curl -X POST http://localhost:5001/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
echo.
echo.

echo Done! Copy the token from above to use in authenticated requests.
pause
