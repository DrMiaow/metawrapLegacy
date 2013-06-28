
//http://en.wikipedia.org/wiki/Mersenne_twister

// Create a length 624 array to store the state of the generator
var int[0..623] MT
 
 // Initialise the generator from a seed
 function initialiseGenerator ( 32-bit int seed ) 
 {
     MT[0] := seed
     
     // loop over each other element
     for i from 1 to 623 
     { 
         MT[i] := last_32bits_of(69069 * MT[i-1])
     }
 }

 // Generate an array of 624 untempered numbers
 function generateNumbers() 
 {
     for i from 0 to 622 
     {
         y := 32nd_bit_of(MT[i]) + last_31bits_of(MT[i+1])
         if y even 
         {
             MT[i] := MT[(i + 397) % 624] bitwise_xor (right_shift_by_1_bit(y))
         } 
         else if y odd 
         {
             MT[i] := MT[(i + 397) % 624] bitwise_xor (right_shift_by_1_bit(y)) bitwise_xor (2567483615)
         }
     }
     
     y := 32nd_bit_of(MT[623]) + last_31bits_of(MT[0])
     
     if y even 
     {
         MT[623] := MT[396] bitwise_xor (right_shift_by_1_bit(y))
     } 
     else 
     if y odd 
     {
         MT[623] := MT[396] bitwise_xor (right_shift_by_1_bit(y)) bitwise_xor (2567483615)
     }
 }
 
 // Extract a tempered pseudorandom number based on the i-th value
 function extractNumber(int i) 
 {
     y := MT[i]
     y := y bitwise_xor (right_shift_by_11_bits(y))
     y := y bitwise_xor (left_shift_by_7_bits(y) bitwise_and (2636928640))
     y := y bitwise_xor (left_shift_by_15_bits(y) bitwise_and (4022730752))
     y := y bitwise_xor (right_shift_by_18_bits(y))
     return y
 }
