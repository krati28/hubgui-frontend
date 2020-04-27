import React, { Component } from 'react'

class AddPathDetails extends Component{
    render(){
        return(
            <div>
                <form>
                    <fieldset>
                        <legend>Add Path Details Here...</legend>

                        <label for="pathName" class="required">Path Name:</label>
                        <input type="text" id="fname" name="fname" value=""/><br/><br/>

                        <label for="OCCompliance" class="required">OC Compliance Flag:</label>
                        <input type="checkbox"/><br/><br/>


                        <label for="" class="required">Interface Type: </label>
                        <select id="interfaaceType" name="cars">
                            <option value="ss7">SS7</option>
                            <option value="smpp">SMPP</option>
                            <option value="smppes">SMPP ES</option>
                        </select>
                        <br/><br/>

                        <div>
                                <button class="gaping" id="done">Done</button>
                                <button id="clear" class="gaping">Clear</button>
                                <button id="cancel">Cancel</button>
                        </div>
                        <br/><br/><br/>
                        <label class="mandatory" >* Denotes Mandatory Fields</label>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default AddPathDetails;