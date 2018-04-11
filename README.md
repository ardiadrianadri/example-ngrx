# ExampleNgrx

Example of Angular app with ngrx + effects

# Run the example
This app is using the public API REST of Marvel. To run the app you need to create a user in the [Marvel developers portal](https://developer.marvel.com/) to get your own [private and public key](https://developer.marvel.com/account). 

Once you have your own private and public keys you have to do:

1. Create a file called 'marvel-keys.json' in the assets folder
2. The json file should have the next structure:
```
{
  "marvelPublicKey": "<Copy here your public key>",
  "marvelPrivateKey": "<Copy here your private key>"
}
```
3. Paste your public key and your private key as value of the 'marvelPublicKey' and 'marvelPrivateKey' attributes respectively
4. Run the command 'npm start' in the workfolder 
