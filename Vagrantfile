Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-16.04"
  config.ssh.forward_agent = true
  config.vm.network "private_network", ip: "192.168.50.4"
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "./devops/deployment/deploy.yml"
  end
end
