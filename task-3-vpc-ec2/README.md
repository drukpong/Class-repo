# Task 3 — VPC, Subnets, EC2 and Nginx

## Objective

Create an AWS VPC with two subnets, an Internet Gateway, and a route table. Launch an EC2 instance in each subnet, install Nginx on both instances, and verify the Nginx default page from a web browser.

## 1. VPC Creation

Created a VPC with the following configuration:

* **VPC Name:** `class-vpc`
* **IPv4 CIDR:** `10.0.0.0/16`

## 2. Subnets

Created two subnets inside `class-vpc`:

### Subnet 1

* **Name:** `class-subnet-1`
* **CIDR:** `10.0.1.0/24`

### Subnet 2

* **Name:** `class-subnet-2`
* **CIDR:** `10.0.2.0/24`

The subnets were configured as public subnets by associating them with the route table that routes internet traffic through the Internet Gateway.

## 3. Internet Gateway

Created and attached an Internet Gateway:

* **Name:** `class-igw`
* **Attached VPC:** `class-vpc`

## 4. Route Table

Created a route table:

* **Name:** `class-public-rt`
* **VPC:** `class-vpc`

Added the following route:

```text
Destination: 0.0.0.0/0
Target: Internet Gateway (class-igw)
```

Associated the route table with:

* `class-subnet-1`
* `class-subnet-2`

## 5. Security Group

Created the security group:

* **Name:** `class-web-sg`

Inbound access configured:

* **SSH:** TCP port 22 from My IP
* **HTTP:** TCP port 80 from anywhere IPv4

## 6. EC2 Instance 1

Created the first EC2 instance:

* **Name:** `class-ec2-1`
* **Subnet:** `class-subnet-1`
* **Public IPv4:** `44.193.197.199`
* **Operating System:** Ubuntu Server LTS
* **Web Server:** Nginx

Connected through SSH and installed Nginx using:

```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl enable --now nginx
```

Verified that Nginx was active and running.

The Nginx default page was successfully opened in a web browser using the instance public IP address.

## 7. EC2 Instance 2

Created the second EC2 instance:

* **Name:** `class-ec2-2`
* **Subnet:** `class-subnet-2`
* **Public IPv4:** `3.83.52.31`
* **Operating System:** Ubuntu Server LTS
* **Web Server:** Nginx

Connected through SSH and installed Nginx using:

```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl enable --now nginx
```

Verified that Nginx was active and running.

The Nginx default page was successfully opened in a web browser using the instance public IP address.

## 8. Verification

Both EC2 instances successfully served the default Nginx web page.

### EC2 #1

```text
http://44.193.197.199
```

### EC2 #2

```text
http://3.83.52.31
```

## 9. Result

The AWS networking environment was successfully created with:

* 1 VPC
* 2 subnets
* 1 Internet Gateway
* 1 route table
* 2 EC2 instances
* Nginx installed on both EC2 instances
* Successful browser access to both Nginx default pages

Screenshots documenting the deployment are included in the `screenshots` directory.
