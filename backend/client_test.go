package main

import ("testing"
)


func NewClientSuccess(t *testing.T) {
	nickname := "pedro"
	sala := "sala"
	factoryManager := factoryManager{}
	manager := factoryManager.new_manager()
	factory := factoryClient{}
	client := factory.NewClient(nil, nickname,sala,manager)

	if client == nil{
		t.Fail()
	}
}


