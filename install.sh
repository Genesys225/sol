#prerequisits 
apt -y install nodejs
yum install nodejs -y
npm install bower forever -g

cd Front
npm install
bower install
cd ..
cd Back
npm install
cd ..

